import React from "react";

declare const Pi: any; // Pi SDK global objesi için

const PaymentButton: React.FC = () => {
  const handlePayment = () => {
    Pi.createPayment(
      {
        amount: 1, // test için 1 Pi
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
  };

  return <button onClick={handlePayment}>Test Payment</button>;
};

export default PaymentButton;