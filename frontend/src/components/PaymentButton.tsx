import React, { useState } from "react";

interface PaymentButtonProps {
  amount: number;
  receiver: string;
  memo?: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  receiver,
  memo = "Health360+ Payment",
}) => {
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    setLoading(true);
    try {
      // 🔹 Cloudflared tunnel URL
      const backendUrl = "https://governance-aberdeen-guam-picked.trycloudflare.com";

      // 1️⃣ Approve payment
      const res = await fetch(${backendUrl}/approve_payment, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, receiver, memo }),
      });

      const data = await res.json();

      if (data.paymentId) {
        alert(Payment ID: ${data.paymentId});

        // 2️⃣ Pi Wallet aç
        const payUrl = "https://minepi.com/pay";
        window.open(
          ${payUrl}/${data.paymentId},
          "_blank",
          "width=500,height=700"
        );

        // 3️⃣ Complete payment (opsiyonel: frontend tetikleyebilir)
        await fetch(${backendUrl}/complete_payment, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId: data.paymentId, txid: "USER_TX_ID" }),
        });
      } else {
        alert(Hata: ${data.error});
      }
    } catch (err) {
      alert("Sunucu hatası: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={startPayment}
      disabled={loading}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "8px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      {loading ? "Ödeme İşleniyor..." : Öde ${amount} Pi}
    </button>
  );
};

export default PaymentButton;