// types
import type { Request, Response } from 'express';
import type { CodeBlock } from '../types/types.js';

type newCodeBlock = Omit<CodeBlock, '_id'>;

// Local imports
import { codeBlocksCollection, codeFoldersCollection } from '../utils/mongodbConnection.js';
import { ObjectId } from 'mongodb';

async function getCodes(req: Request, res: Response) {
  try {
    res.send('wait');
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

async function getSingleCode(req: Request, res: Response) {
  try {
    const { uid, email } = res.locals.tokenData;
    const codeBlockId = req.params.id;

    const coll = codeBlocksCollection();
    const codeBlock = await coll.findOne({ uid, email, _id: new ObjectId(codeBlockId) });

    res.send(codeBlock);
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

async function addNewCode(req: Request, res: Response) {
  try {
    const { email, uid } = res.locals.tokenData;
    const data: newCodeBlock = req.body;
    const newCodeBlock: newCodeBlock = {
      uid,
      email,
      folder_id: data.folder_id,
      title: data.title ?? '',
      description: data.description ?? '',
      code: data.code ?? '',
      language: data.language ?? '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
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

    res.send(insertResponse);
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

async function updateCode(req: Request, res: Response) {
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

async function deleteCode(req: Request, res: Response) {
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

export { getCodes, getSingleCode, addNewCode, updateCode, deleteCode };
