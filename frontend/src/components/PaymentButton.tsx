import React from "react";
import axios from "axios";

declare const Pi: any; // Pi SDK global objesi

const PaymentButton: React.FC = () => {
  const handlePayment = async () => {
    try {
      // Backend’e ödeme isteği gönder
      const response = await axios.post(
        "https://pi-health360-plus-lcshboldc-furkan-yilmazs-projects-faf0f87a.vercel.app/create-payment",
        {
          amount: 1,
          memo: "Health 360+ test ödemesi",
        }
      );

      console.log("Backend yanıtı:", response.data);

      // Pi SDK ödeme başlat
      if (window.Pi) {
        window.Pi.createPayment(
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
      } else {
        alert("Pi SDK yüklü değil!");
      }
    } catch (error) {
      console.error("Backend ödeme hatası:", error);
    }
  };

  return <button onClick={handlePayment}>Test Payment</button>;
};

export default PaymentButton;