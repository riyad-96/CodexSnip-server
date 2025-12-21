import { Request, Response } from 'express';
import { CodeFolder, NewFolderDataType } from '../../types/types.js';
import { codeFoldersCollection } from '../../utils/mongodbConnection.js';

export default async function addNewCodeFolder(req: Request, res: Response) {
  const { email, uid } = res.locals.tokenData;
  try {
    const data: NewFolderDataType = req.body;
    const newCodeFolder: Omit<CodeFolder, '_id'> = {
      uid,
      email,
      folder_name: data.folder_name ?? '',
      folder_description: data.folder_description ?? '',
      code_blocks: [],
      created_at: new Date(),
      updated_at: new Date(),
    };
    const coll = codeFoldersCollection();
    await coll.insertOne(newCodeFolder);
    res.send('folder-created');
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}
