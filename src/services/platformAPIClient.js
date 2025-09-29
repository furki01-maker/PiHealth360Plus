"use strict";

const axios = require("axios");
const env = require("../environments"); // tek kaynak

// Axios instance
const platformAPIClient = axios.create({
  baseURL: env.platform_api_url,
  timeout: 20000,
  headers: { 'Authorization': `Key ${env.pi_api_key}` }, // backtick unutma
});

module.exports = platformAPIClient;