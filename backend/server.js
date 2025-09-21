const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 3001;

// API Key
const API_KEY = "r7vf7xbwiel1dfqfcr5cfshc66mftdrtbdin1r2zgmvodvsilzhtfnz49kqs4kpa";

app.use(
  cors({
    origin: "http://localhost:3315",
    credentials: true,
  })
);

app.use(express.json());

// JWT doğrulama endpoint
app.post("/me", async (req, res) => {
  const { token } = req.body;
  try {
    const response = await axios.get("https://api.minepi.com/v2/me", {
      headers: { Authorization: `Bearer ${token}` }, // <-- backtick düzeltildi
    });
    res.json(response.data);
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
});

// Payment oluşturma endpoint
app.post("/create-payment", async (req, res) => {
  const paymentData = req.body;

  try {
    const response = await axios.post(
      "https://api.minepi.com/v2/payments",
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment failed" });
  }
});

// Incomplete payment tamamlama
app.post("/complete-payment", async (req, res) => {
  const payment = req.body;

  try {
    const response = await axios.post(
      "https://api.minepi.com/v2/payments/complete",
      payment,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Completing payment failed" });
  }
});

app.listen(PORT, () =>
  console.log(`Backend port ${PORT} portunda çalışıyor`)
);