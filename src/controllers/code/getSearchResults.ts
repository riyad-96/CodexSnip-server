import { Request, Response } from 'express';
import { codeBlocksCollection, codeFoldersCollection } from '../../utils/mongodbConnection.js';

type FolderFilterType = {
  email: string;
  $or?: {
    folder_name?: { $regex: string; $options: string };
    folder_description?: { $regex: string; $options: string };
  }[];
};

type CodeFilterType = {
  email: string;
  $or?: {
    title?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
  }[];
};

export default async function getSearchResults(req: Request, res: Response) {
  try {
    const body = req.body;
    const { email } = res.locals.tokenData;

    const folderFilter: FolderFilterType = {
      email,
    };
    const codeFilter: CodeFilterType = {
      email,
    };

    if (body.search) {
      folderFilter.$or = [
        { folder_name: { $regex: body.search, $options: 'i' } },
        { folder_description: { $regex: body.search, $options: 'i' } },
      ];

      codeFilter.$or = [
        { title: { $regex: body.search, $options: 'i' } },
        { description: { $regex: body.search, $options: 'i' } },
      ];
    }

    const folders = await codeFoldersCollection()
      .find(folderFilter)
      .limit(body.search ? 0 : 5)
      .sort({ updated_at: -1 })
      .toArray();

    const codes = await codeBlocksCollection()
      .find(codeFilter)
      .limit(body.search ? 0 : 5)
      .sort({ updated_at: -1 })
      .toArray();

    res.send({
      folders,
      codes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}
