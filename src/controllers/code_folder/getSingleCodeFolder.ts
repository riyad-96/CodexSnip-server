import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { codeBlocksCollection, codeFoldersCollection } from '../../utils/mongodbConnection.js';

export default async function getSingleCodeFolder(req: Request, res: Response) {
  try {
    const { email } = res.locals.tokenData;
    const id = req.params.id;

    const folder = await codeFoldersCollection().findOne({ email, _id: new ObjectId(id) });
    if (!folder) return res.status(404).send('folder-not-found');

    const blocks = await codeBlocksCollection()
      .find({ email, folder_id: new ObjectId(id) })
      .sort({ created_at: -1 })
      .toArray();

    res.send({ ...folder, code_blocks: blocks });
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}
