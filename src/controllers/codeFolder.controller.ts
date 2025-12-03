// types
import type { Request, Response } from 'express';
// Local imports
import { codeBlocksCollection, codeFoldersCollection } from '../utils/mongodbConnection.js';
import { CodeFolder, UpdateFolderDetailsType } from '../types/types.js';
import { ObjectId } from 'mongodb';

// add new code folder
async function addNewCodeFolder(req: Request, res: Response) {
  const { email, uid } = res.locals.tokenData;
  try {
    const newCodeFolder: Omit<CodeFolder, '_id'> = {
      uid,
      email,
      folder_name: '',
      folder_description: '',
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

async function getCodeFolders(req: Request, res: Response) {
  const { email, uid } = res.locals.tokenData;
  try {
    const codeFolderCollection = codeFoldersCollection();
    const folders = await codeFolderCollection.find({ email, uid }).toArray();
    res.send(folders);
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

async function getSingleCodeFolder(req: Request, res: Response) {
  try {
    const { email } = res.locals.tokenData;
    const id = req.params.id;
    const coll = codeFoldersCollection();
    const folder = await coll.findOne({ _id: new ObjectId(id), email });
    if (!folder) return res.status(404).send('folder-not-found');
    res.send(folder);
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

async function updateCodeFolder(req: Request, res: Response) {
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
          updated_at: new Date().toISOString(),
        },
      },
    );

    res.send('folder-updated');
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

async function deleteCodeFolder(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { email } = res.locals.tokenData;

    const folderColl = codeFoldersCollection();
    const codeColl = codeBlocksCollection();

    const folder = await folderColl.findOne({ email, _id: new ObjectId(id) });
    if (!folder) return res.status(404).send('folder-not-found');

    await codeColl.deleteMany({ email, folder_id: folder._id.toString() });
    await folderColl.deleteOne({ email, _id: new ObjectId(id) });

    res.send('folder-deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

export {
  addNewCodeFolder,
  getCodeFolders,
  getSingleCodeFolder,
  updateCodeFolder,
  deleteCodeFolder,
};
