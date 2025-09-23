import React, { useState } from "react";

interface PaymentButtonProps {
  amount: number;
  receiver: string; // Kullanıcının Pi cüzdan adresi
  memo?: string;    // Opsiyonel açıklama
  env?: "sandbox" | "production"; // Sandbox veya production
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  receiver,
  memo = "Health360+ Payment",
  env = "sandbox",
}) => {
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    setLoading(true);
    try {
      // Backend fonksiyonuna request gönder
      const res = await fetch("/.netlify/functions/create-payment", {
        method: "POST",
        body: JSON.stringify({ amount, receiver, memo, env }),
      });

      const data = await res.json();

      if (data.paymentId) {
        alert(Ödeme ID: ${data.paymentId} oluştu! Cüzdan popup açılabilir.);

        // Pi Wallet popup örneği (video mantığı)
        // window.location.href yerine Pi SDK kullanımı olabilir
        window.open(
          https://sandbox.minepi.com/pay/${data.paymentId},
          "_blank",
          "width=500,height=700"
        );
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