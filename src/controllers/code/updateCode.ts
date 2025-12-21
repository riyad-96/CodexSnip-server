import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { codeBlocksCollection, codeFoldersCollection } from '../../utils/mongodbConnection.js';
import updateCodeFolderUpdateTime from '../../utils/updateCodeFolderUpdateTime.js';
import type { EditorUpdateValuesType } from '../../types/types.js';

export default async function updateCode(req: Request, res: Response) {
  try {
    const { email } = res.locals.tokenData;
    const data = req.body as EditorUpdateValuesType;

    const folderColl = codeFoldersCollection();
    const codeBlockColl = codeBlocksCollection();

    const folder = await folderColl.findOne({ email, _id: new ObjectId(data.folder_id) });
    const codeBlock = await codeBlockColl.findOne({ email, _id: new ObjectId(data.code_block_id) });

    if (!folder) return res.status(404).send('folder-not-found');
    if (!codeBlock) return res.status(404).send('codeblock-not-found');

    await codeBlockColl.updateOne(
      { email, _id: new ObjectId(data.code_block_id) },
      {
        $set: {
          title: data.title,
          description: data.description,
          code: data.code,
          language: data.language,
          theme: data.theme,
          updated_at: new Date(),
        },
      },
    );

    await updateCodeFolderUpdateTime(email, new ObjectId(data.folder_id));

    res.send('codeblock-updated');
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}
