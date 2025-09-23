require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.PI_API_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;
const MONGO_URI = process.env.MONGO_URI;

// -----------------------------
// MongoDB Bağlantısı
// -----------------------------
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB bağlantısı başarılı"))
.catch(err => console.error("MongoDB bağlantı hatası:", err));

// -----------------------------
// Middleware
// -----------------------------
app.use(cors({
  origin: [FRONTEND_URL],
  credentials: true,
}));
app.use(express.json());

// -----------------------------
// Ödeme oluşturma endpoint (test/mock)
// -----------------------------
app.post("/create-payment", (req, res) => {
  const { amount, memo } = req.body;
  console.log("Ödeme isteği geldi:", amount, memo);
  const paymentId = "sandbox-test-id";
  res.json({ status: "success", paymentId });
});

// -----------------------------
// Ödeme tamamlama endpoint
// -----------------------------
app.post("/complete-payment", async (req, res) => {
  const { paymentId } = req.body;
  if (!paymentId) {
    return res.status(400).json({ error: "paymentId missing" });
  }

  console.log("Sandbox Payment Received:", req.body);

  try {
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      {},
      {
        headers: {
          Authorization: `Key ${API_KEY}`,
        },
      }
    );

    console.log("Payment tamamlandı:", response.data);

    res.json({
      status: "approved",
      piResponse: response.data,
    });
  } catch (error) {
    console.error("Payment completion error:", error.response?.data || error.message);
    res.status(500).json({ error: "Payment completion failed" });
  }
});

// -----------------------------
// Sunucuyu başlat
// -----------------------------
app.listen(PORT, () => {
  console.log(`Backend port ${PORT} portunda çalışıyor`);
});