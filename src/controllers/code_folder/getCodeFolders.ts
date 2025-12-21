import { Request, Response } from 'express';
import { codeFoldersCollection } from '../../utils/mongodbConnection.js';

export default async function getCodeFolders(req: Request, res: Response) {
  const { email, uid } = res.locals.tokenData;
  try {
    const codeFolderCollection = codeFoldersCollection();
    const folders = await codeFolderCollection
      .find({ email, uid })
      .sort({ created_at: -1 })
      .toArray();
    res.send(folders);
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}
