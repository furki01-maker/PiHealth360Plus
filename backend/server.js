const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.startsWith("http://localhost")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.post("/create-payment", (req, res) => {
  const { amount, memo } = req.body;

  console.log("Ödeme isteği geldi:", amount, memo);

  // Burada gerçek Pi Payment API çağrısı olacak (sandbox/test için)
  res.json({ status: "success", paymentId: "sandbox-test-id" });
});

app.listen(PORT, () => {
  console.log(`Backend port ${PORT} portunda çalışıyor`);
});