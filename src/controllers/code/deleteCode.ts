import { Request, Response } from 'express';
import { codeBlocksCollection, codeFoldersCollection } from '../../utils/mongodbConnection.js';
import { ObjectId } from 'mongodb';
import updateCodeFolderUpdateTime from '../../utils/updateCodeFolderUpdateTime.js';

export default async function deleteCode(req: Request, res: Response) {
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

    await updateCodeFolderUpdateTime(email, new ObjectId(folder_id));

    res.send('codeblock-deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('server-error');
  }
}
