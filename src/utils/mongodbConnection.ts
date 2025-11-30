// External imports
import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI as string);

let db: Db;

async function connectToDB() {
  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log('mongodb connected');
}

function getDB() {
  if (!db) throw new Error('Database not found');
  return db;
}

function getCollection(name: string) {
  const coll = getDB().collection(name);
  if (!coll) throw new Error('Collection not found');
}

export { connectToDB, getDB, getCollection };
