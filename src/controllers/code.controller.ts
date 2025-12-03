// types
import type { Request, Response } from 'express';
import type { CodeBlock, EditorUpdateValuesType } from '../types/types.js';

type newCodeBlock = Omit<CodeBlock, '_id'>;

// Local imports
import { codeBlocksCollection, codeFoldersCollection } from '../utils/mongodbConnection.js';
import { ObjectId } from 'mongodb';

export async function updateCodeFolderUpdateTime(email: string, folder_id: string) {
  const folderColl = codeFoldersCollection();
  await folderColl.updateOne(
    { email, _id: new ObjectId(folder_id) },
    {
      $set: {
        updated_at: new Date(),
      },
    },
  );
}

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
    const { email } = res.locals.tokenData;
    const codeBlockId = req.params.id;

    const coll = codeBlocksCollection();
    const codeBlock = await coll.findOne({ email, _id: new ObjectId(codeBlockId) });

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

async function updateCode(req: Request, res: Response) {
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

    await updateCodeFolderUpdateTime(email, data.folder_id);

    res.send('codeblock-updated');
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

async function deleteCode(req: Request, res: Response) {
  try {
    const { email } = res.locals.tokenData;
    const { folder_id, code_block_id } = req.params;

    const folderColl = codeFoldersCollection();
    const codeBlockColl = codeBlocksCollection();

    const folder = await folderColl.findOne({ email, _id: new ObjectId(folder_id) });
    const codeBlock = await codeBlockColl.findOne({ email, _id: new ObjectId(code_block_id) });

    if (!folder) return res.status(404).send('folder-not-found');
    if (!codeBlock) return res.status(404).send('codeblock-not-found');

    await codeBlockColl.deleteOne({ email, _id: new ObjectId(code_block_id) });
    await folderColl.updateOne(
      { email, _id: new ObjectId(folder_id) },
      {
        $pull: {
          code_blocks: new ObjectId(code_block_id),
        },
      },
    );

    await updateCodeFolderUpdateTime(email, folder_id);

    res.send('codeblock-deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}

export { getCodes, getSingleCode, addNewCode, updateCode, deleteCode };
