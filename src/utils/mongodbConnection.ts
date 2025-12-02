// External imports
import { MongoClient, Document } from 'mongodb';
import type { Collection, Db } from 'mongodb';
import { CodeBlock, CodeFolder } from '../types/types.js';

const client = new MongoClient(process.env.MONGODB_URI as string);

let db: Db;

async function connectToDB(callback: () => void) {
  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log('mongodb connected');
  callback();
}

function getCollection<T extends Document>(name: string): Collection<T> {
  if (!db) throw new Error('DB not initialized. Call connectToDB() first.');
  return db.collection<T>(name);
}

const codeBlocksCollection = () => getCollection<CodeBlock>('code_blocks');
const codeFoldersCollection = () => getCollection<CodeFolder>('code_folders');

export { connectToDB, getCollection, codeBlocksCollection, codeFoldersCollection };
