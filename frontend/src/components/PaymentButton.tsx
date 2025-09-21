import React, { useState } from "react";
import axios from "axios";

declare const Pi: any; // Pi SDK global objesi

const PaymentButton: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  const handleAuthenticate = async () => {
    if (!Pi) return alert("Pi SDK yüklü değil!");

    try {
      const result = await Pi.authenticate({
        scopes: ["username", "payments"],
        onIncompletePaymentFound: (payment: any) => {
          console.log("Incomplete payment detected:", payment);
          axios.post("http://localhost:3001/complete-payment", payment);
        },
      });
      console.log("Authenticated user:", result);
      setUser(result);
    } catch (err) {
      console.error("Authentication failed:", err);
    }
  };

  const handlePayment = async () => {
    if (!user) return alert("Ödeme için önce authenticate olun!");

    try {
      // Backend’e ödeme isteği
      const backendResponse = await axios.post("http://localhost:3001/create-payment", {
        amount: 1,
        memo: "Health 360+ test ödemesi",
      });
      console.log("Backend yanıtı:", backendResponse.data);

      // Pi SDK ödeme başlatma
      Pi.createPayment(
        {
          amount: 1,
          memo: "Health 360+ test ödemesi",
          metadata: { purpose: "sandbox-test" },
        },
        {
          onReadyForServerApproval: (paymentId: string) => {
            console.log("Ödeme başlatıldı:", paymentId);
          },
          onReadyForServerCompletion: (paymentId: string, txid: string) => {
            console.log("Ödeme tamamlandı:", paymentId, txid);
            alert("Ödeme başarıyla tamamlandı!");
          },
          onCancel: (paymentId: string) => {
            console.log("Kullanıcı iptal etti:", paymentId);
          },
          onError: (error: any, paymentId: string) => {
            console.error("Hata:", error, paymentId);
          },
        }
      );
    } catch (err) {
      console.error("Backend ödeme hatası:", err);
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