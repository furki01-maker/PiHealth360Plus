import React, { useState } from "react";

const App = () => {
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
    if (!window.Pi || !user) {
      alert("Ödeme için önce authenticate olmalısınız!");
      return;
    }

    try {
      // Backend'e ödeme oluşturma isteği gönder
      const backendResponse = await fetch("http://localhost:3001/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1,
          memo: "Health 360+ test ödemesi",
        }),
      });

      const data = await backendResponse.json();
      console.log("Backend create-payment response:", data);

      // Pi SDK ile ödeme başlat
      window.Pi.createPayment(
        {
          amount: 1,
          memo: "Health 360+ test ödemesi",
          metadata: { purpose: "sandbox-test" },
        },
        {
          onReadyForServerApproval: (paymentId) => {
            console.log("Payment started:", paymentId);
          },
          onReadyForServerCompletion: async (paymentId, txid) => {
            console.log("Payment completed:", paymentId, txid);
            alert("Ödeme başarıyla tamamlandı!");

            // Backend'e ödeme tamamlandı bildirimi
            await fetch("http://localhost:3001/complete-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId }),
            });
          },
          onCancel: (paymentId) => {
            console.log("Kullanıcı iptal etti:", paymentId);
          },
          onError: (error, paymentId) => {
            console.error("Payment error:", error, paymentId);
            alert("Ödeme sırasında hata oluştu!");
          },
        }
      );
    } catch (error) {
      console.error("Backend create-payment error:", error);
      alert("Backend ödeme hatası!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>PiHealth360 Payment Test</h1>
      {!user ? (
        <button onClick={handleAuthenticate}>Authenticate</button>
      ) : (
        <button onClick={handlePayment}>Make Payment</button>
      )}
    </div>
  );
};

export default App;