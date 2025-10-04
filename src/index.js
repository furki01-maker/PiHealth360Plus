"use strict";

const fs = require("fs");
const path = require("path");
const express = require("express");
const session = require("express-session");
const mountUserEndpoints = require("./mountUserEndpoints");
const { MongoClient } = require("mongodb");

// Log klasörü ve dosyası
const logDir = path.join(__dirname, "log");
const logFile = path.join(logDir, "access.log");

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
if (!fs.existsSync(logFile)) fs.writeFileSync(logFile, "");

// MongoDB bağlantısı Fly.io secrets kullanılarak
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.MONGODB_DATABASE_NAME;
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

async function startServer() {
  try {
    console.log(`Mongo URI: ${mongoUri}`);
    await client.connect();
    console.log(`MongoDB connected: ${dbName}`);
    const db = client.db(dbName);

    const app = express();

    // Middlewares
    app.use(express.json());
    app.use(session({
      secret: process.env.SESSION_SECRET || "fallbacksecret",
      resave: false,
      saveUninitialized: true
    }));

    // MongoDB koleksiyonlarını locals olarak ata
    app.locals.userCollection = db.collection("users");
    app.locals.orderCollection = db.collection("orders"); // ödemeler için

    // User endpointleri mount et
    mountUserEndpoints(app);

    // Payments router
    const paymentsRouter = require(`./handlers/payments`);
    app.use("/api/payments", paymentsRouter);

    // Portu Fly.io için 0.0.0.0 üzerinde dinle
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

startServer();