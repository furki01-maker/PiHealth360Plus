"use strict";
const dotenv = require("dotenv");
dotenv.config();

const env = {
  session_secret: process.env.SESSION_SECRET || "This is my session secret",
  pi_api_key: process.env.PI_API_KEY || '',
  platform_api_url: process.env.PLATFORM_API_URL || '',
  mongo_uri: process.env.MONGO_URI || 'mongodb://localhost:27017/demo-app',
  mongo_db_name: process.env.MONGODB_DATABASE_NAME || 'demo-app',
  frontend_url: process.env.FRONTEND_URL || 'http://localhost:3314',
};

module.exports = env;