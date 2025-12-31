"use server";

import { MongoClient, ServerApiVersion } from "mongodb";

let client;
let db;

const dbConnect = async () => {
  if (db) return db;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    if (!client) {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          deprecationErrors: true,
        },
      });

      await client.connect(); 
    }

    db = client.db("alhikmahbdorg");
    await db.command({ ping: 1 }); 
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default dbConnect;
