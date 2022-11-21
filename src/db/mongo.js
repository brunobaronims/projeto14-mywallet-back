import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.DB_URI);
try {
  await mongoClient.connect();
} catch (e) {
  console.error(e);
}

const db = mongoClient.db('MyWallet');
export const userCollection = db.collection('users');
export const sessionCollection = db.collection('sessions');
export const transactionCollection = db.collection('transactions');