import { Request, Response } from 'express';
import { codeBlocksCollection } from '../../utils/mongodbConnection.js';
import { ObjectId } from 'mongodb';

export default async function getSingleCode(req: Request, res: Response) {
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