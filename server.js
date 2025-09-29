require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const axios = require("axios");
const mountUserEndpoints = require("./src/index"); // signin/signout route'larını ekle

const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL;
const MONGO_URI = process.env.MONGO_URI;
const API_KEY = process.env.PI_API_KEY;

// -----------------------------
// MongoDB Bağlantısı
// -----------------------------
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch(err => console.error("MongoDB bağlantı hatası:", err));

// -----------------------------
// Middleware
// -----------------------------
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true,
}));
app.use(express.json());

// -----------------------------
// Session Middleware
// -----------------------------
app.use(session({
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // HTTPS kullanıyorsan true yap
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 gün
  }
}));

// -----------------------------
// MongoDB user collection ayarı
// -----------------------------
mongoose.connection.once('open', () => {
  const db = mongoose.connection.db;
  app.locals.userCollection = db.collection('users');
});

// -----------------------------
// User endpoints mount (/api/signin, /api/signout)
// -----------------------------
const router = express.Router();
mountUserEndpoints(router);
app.use("/api", router);

// -----------------------------
// Ödeme oluşturma endpoint (gerçek Pi)
// -----------------------------
app.post("/create-payment", async (req, res) => {
  const { amount, memo } = req.body;

  try {
    const response = await axios.post(
      "https://api.minepi.com/v2/payments",
      { amount, memo },
      { headers: { Authorization: `Key ${API_KEY}` } }
    );

    const paymentId = response.data.id;
    console.log("Payment created:", paymentId);
    res.json({ status: "success", paymentId });

  } catch (error) {
    console.error("Payment creation error:", error.response?.data || error.message);
    res.status(500).json({ error: "Payment creation failed" });
  }
});

// -----------------------------
// Ödeme tamamlama endpoint (gerçek Pi)
// -----------------------------
app.post("/complete-payment", async (req, res) => {
  const { paymentId } = req.body;
  if (!paymentId) return res.status(400).json({ error: "paymentId missing" });

  try {
    const response = await axios.get(
      `https://api.minepi.com/v2/payments/${paymentId}`,
      { headers: { Authorization: `Key ${API_KEY}` } }
    );

    console.log("Payment status:", response.data);
    res.json({
      status: response.data.status,
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
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});