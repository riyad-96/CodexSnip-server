import { Request, Response } from 'express';
import { UpdateFolderDetailsType } from "../../types/types.js";
import { codeFoldersCollection } from '../../utils/mongodbConnection.js';
import { ObjectId } from 'mongodb';

export default async function updateCodeFolder(req: Request, res: Response) {
  try {
    const { email } = res.locals.tokenData;
    const data: UpdateFolderDetailsType = req.body;

    const folderColl = codeFoldersCollection();
    const folder = await folderColl.findOne({ email, _id: new ObjectId(data.folder_id) });

    if (!folder) return res.status(404).send('folder-not-found');

    await folderColl.updateOne(
      { email, _id: new ObjectId(data.folder_id) },
      {
        $set: {
          folder_name: data.folder_name,
          folder_description: data.folder_description,
          updated_at: new Date(),
        },
      },
    );

    res.send('folder-updated');
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}