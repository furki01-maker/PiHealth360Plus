// src/db.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.MONGODB_DATABASE_NAME;

let dbClient;
let userCollection;

async function connectMongo() {
  if (!dbClient) {
    dbClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await dbClient.connect();
    console.log("MongoDB connected!");
    const db = dbClient.db(dbName);
    userCollection = db.collection("users");
  }
  return userCollection;
}

module.exports = { connectMongo };