// src/handlers/payments.js
const express = require('express');
const router = express.Router();
const paymentService = require('../services/paymentService.js'); // Önemli: doğru yol

// Örnek: ödeme oluşturma
router.post('/create', async (req, res) => {
  const { amount, memo, metadata } = req.body;
  try {
    const payment = await paymentService.createPayment(amount, memo, metadata);
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Örnek: ödemeyi tamamlama
router.get('/complete/:id', async (req, res) => {
  const paymentId = req.params.id;
  try {
    const payment = await paymentService.completePayment(paymentId);
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Örnek: tamamlanmamış server ödemelerini alma
router.get('/incomplete', async (req, res) => {
  try {
    const payments = await paymentService.getIncompleteServerPayments();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;