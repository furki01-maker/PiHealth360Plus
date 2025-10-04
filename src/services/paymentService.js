const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.PI_API_KEY;

async function createPayment(amount, memo, metadata = {}) {
  try {
    const response = await axios.post(
      "https://api.minepi.com/v2/payments",
      { amount, memo, metadata },
      { headers: { Authorization: `Key ${API_KEY}` } }
    );
    return response.data;
  } catch (err) {
    console.error("Payment creation failed:", err.response?.data || err.message);
    throw err;
  }
}

async function completePayment(paymentId) {
  try {
    const response = await axios.get(
      `https://api.minepi.com/v2/payments/${paymentId}`,
      { headers: { Authorization: `Key ${API_KEY}` } }
    );
    return response.data;
  } catch (err) {
    console.error("Payment completion failed:", err.response?.data || err.message);
    throw err;
  }
}

async function getIncompleteServerPayments() {
  try {
    const response = await axios.get(
      "https://api.minepi.com/v2/payments/incomplete",
      { headers: { Authorization: `Key ${API_KEY}` } }
    );
    return response.data;
  } catch (err) {
    console.error("Fetching incomplete payments failed:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = {
  createPayment,
  completePayment,
  getIncompleteServerPayments
};