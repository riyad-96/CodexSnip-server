// types
import type { Request, Response } from 'express';
// Local imports
import { getCollection } from '../utils/mongodbConnection.js';
import { CodeFolder } from '../types/types.js';

function getCodeFolderCollection() {
  return getCollection('code_folders');
}

// add new code folder
async function addNewCodeFolder(req: Request, res: Response) {
  const { email, uid } = res.locals.tokenData;
  try {
    const newCodeFolder: CodeFolder = {
      uid,
      email,
      folder_name: '',
      folder_description: '',
      code_blocks: [],
      created_at: new Date(),
      updated_at: new Date(),
    };
    const coll = getCodeFolderCollection();
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
    const codeFolderCollection = getCollection('code_folders');
    const folders = await codeFolderCollection.find({ email, uid }).toArray();
    res.send(folders);
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}
async function updateCodeFolder(req: Request, res: Response) {
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}
async function deleteCodeFolder(req: Request, res: Response) {
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

export { addNewCodeFolder, getCodeFolders, updateCodeFolder, deleteCodeFolder };
