import React, { useState } from "react";
import axios from "axios";

const PaymentButton = () => {
  const [user, setUser] = useState(null);

  // Kullanıcı authenticate
  const handleAuthenticate = async () => {
    if (!window.Pi) {
      alert("Pi SDK yüklü değil!");
      return;
    }

    try {
      const result = await window.Pi.authenticate({
        scopes: ["username", "payments"],
        onIncompletePaymentFound: (payment) => {
          console.log("Incomplete payment detected:", payment);

          // Backend'e incomplete payment bildir
          fetch("http://localhost:3001/complete-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payment),
          });
        },
      });

      console.log("Authenticated user:", result);
      setUser(result);
    } catch (err) {
      console.error("Authentication failed", err);
      alert("Authentication başarısız!");
    }
  };

  // Ödeme başlatma
  const handlePayment = async () => {
    if (!user) {
      alert("Ödeme için önce authenticate olmalısınız!");
      return;
    }

    try {
      // Backend’e ödeme isteği gönder
      const backendResponse = await axios.post("http://localhost:3001/create-payment", {
        amount: 1,