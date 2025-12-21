import { Request, Response } from 'express';
import { CodeBlock } from '../../types/types.js';
import { ObjectId } from 'mongodb';
import { codeBlocksCollection, codeFoldersCollection } from '../../utils/mongodbConnection.js';
import updateCodeFolderUpdateTime from '../../utils/updateCodeFolderUpdateTime.js';

type newCodeBlock = Omit<CodeBlock, '_id'>;

export default async function addNewCode(req: Request, res: Response) {
  try {
    const { email, uid } = res.locals.tokenData;
    const data: newCodeBlock = req.body;
    const newCodeBlock: newCodeBlock = {
      uid,
      email,
      folder_id: new ObjectId(data.folder_id),
      title: data.title ?? '',
      description: data.description ?? '',
      code: data.code ?? '',
      language: data.language ?? '',
      theme: data.theme ?? '',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const coll = codeBlocksCollection();
    const folderColl = codeFoldersCollection();

    const folderExists = await folderColl.findOne({ _id: new ObjectId(data.folder_id), email });
    if (!folderExists) return res.status(404).send('folder-not-found');
    const insertResponse = await coll.insertOne(newCodeBlock);

    await folderColl.updateOne(
      { _id: new ObjectId(data.folder_id) },
      {
        $push: {
          code_blocks: insertResponse.insertedId,
        },
      },
    );
    await updateCodeFolderUpdateTime(email, data.folder_id);

    res.send(insertResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}