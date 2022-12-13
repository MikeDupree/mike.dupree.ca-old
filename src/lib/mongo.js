
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environmental variable");
}

if (!MONGODB_DB) {
  throw new Error("Define the MONGODB_DB environmental variable");
}

let cachedClient = null;
let cachedDb = null;

const dbUri = MONGODB_URI;

/**
 * Connect to MondoDB
 */
export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return cachedDb;
  }
 
  let client = new MongoClient(dbUri);

  await client.connect();

  let db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;
  return db;
}

