// External imports
import { MongoClient, Document } from 'mongodb';
import type { Collection, Db } from 'mongodb';
import { CodeBlock, CodeFolder } from '../types/types.js';

const client = new MongoClient(process.env.MONGODB_URI as string);

let db: Db;

async function connectToDB() {
  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log('mongodb connected');
}

// function getDB() {
//   if (!db) throw new Error('Database not found');
//   return db;
// }

// function getCollection(name: string) {
//   const coll = getDB().collection(name);
//   if (!coll) throw new Error('Collection not found');
//   return coll;
// }

// function getCodeBlocksCollection() {
//   return getCollection('code_blocks');
// }
// function getCodeFolderCollection() {
//   return getCollection('code_folders');
// }

// export { connectToDB, getDB, getCollection, getCodeBlocksCollection, getCodeFolderCollection };

function getCollection<T extends Document>(name: string): Collection<T> {
  if (!db) throw new Error('DB not initialized. Call connectToDB() first.');
  return db.collection<T>(name);
}

const codeBlocksCollection = () => getCollection<CodeBlock>('code_blocks');
const codeFoldersCollection = () => getCollection<CodeFolder>('code_folders');

export { connectToDB, getCollection, codeBlocksCollection, codeFoldersCollection };
