const express = require("express");
const router = express.Router();
const paymentService = require("../services/paymentService");

// Ödeme oluşturma
router.post("/create-payment", async (req, res) => {
  const { amount, memo, metadata } = req.body;
  try {
    const payment = await paymentService.createPayment(amount, memo, metadata);
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: "Payment creation failed" });
  }
});

// Ödeme tamamlama
router.post("/complete-payment", async (req, res) => {
  const { paymentId } = req.body;
  try {
    const result = await paymentService.completePayment(paymentId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Payment completion failed" });
  }
});

// Devam eden ödemeleri kontrol etme
router.get("/incomplete-payments", async (req, res) => {
  try {
    const payments = await paymentService.getIncompleteServerPayments();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: "Fetching incomplete payments failed" });
  }
});

module.exports = router;