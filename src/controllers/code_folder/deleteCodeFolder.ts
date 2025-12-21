import { Request, Response } from 'express';
import { codeBlocksCollection, codeFoldersCollection } from '../../utils/mongodbConnection.js';
import { ObjectId } from 'mongodb';

export default async function deleteCodeFolder(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { email } = res.locals.tokenData;

    const folderColl = codeFoldersCollection();
    const codeColl = codeBlocksCollection();

    const folder = await folderColl.findOne({ email, _id: new ObjectId(id) });
    if (!folder) return res.status(404).send('folder-not-found');

    await codeColl.deleteMany({ email, folder_id: folder._id });
    await folderColl.deleteOne({ email, _id: new ObjectId(id) });

    res.send('folder-deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}
