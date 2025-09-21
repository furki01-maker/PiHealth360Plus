import React, { useState } from "react";
import axios from "axios";

const PaymentButton = () => {
  const [user, setUser] = useState(null);

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
          // Backend'e bildir
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
    }
  };

  const handlePayment = async () => {
    if (!user) {
      alert("Ödeme için önce authenticate olmalısınız!");
      return;
    }

    try {
      // Backend’e ödeme isteği gönder
      const backendResponse = await axios.post("http://localhost:3001/create-payment", {
        amount: 1,
        memo: "Health 360 test ödemesi",
      });
      console.log("Backend yanıtı:", backendResponse.data);

      // Pi SDK ödeme başlat
      if (window.Pi) {
        window.Pi.createPayment(
          {
            amount: 1,
            memo: "Health 360 test ödemesi",
            metadata: { purpose: "sandbox-test" },
          },
          {
            onReadyForServerApproval: (paymentId) => {
              console.log("Ödeme başlatıldı:", paymentId);
            },
            onReadyForServerCompletion: (paymentId, txid) => {
              console.log("Ödeme tamamlandı:", paymentId, txid);
              alert("Ödeme başarıyla tamamlandı!");
            },
            onCancel: (paymentId) => {
              console.log("Kullanıcı iptal etti:", paymentId);
            },
            onError: (error, paymentId) => {
              console.error("Hata:", error, paymentId);
            },
          }
        );
      }
    } catch (error) {
      console.error("Backend ödeme hatası:", error);
    }
  };

  return (
    <div>
      {!user ? (
        <button onClick={handleAuthenticate}>Authenticate</button>
      ) : (
        <button onClick={handlePayment}>Test Payment</button>
      )}
    </div>
  );
};

export default PaymentButton;