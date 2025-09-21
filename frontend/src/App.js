import React, { useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  const handleAuthenticate = async () => {
    if (!window.Pi) return;

    try {
      const result = await window.Pi.authenticate({
        scopes: ["username", "payments"],
        onIncompletePaymentFound: (payment) => {
          console.log("Incomplete payment detected:", payment);
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
    if (!window.Pi || !user) return;

    const payment = await window.Pi.createPayment({
      amount: 1,
      memo: "Test Payment",
    });

    console.log("Payment initiated:", payment);

    await fetch("http://localhost:3001/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payment),
    });
  };

  return (
    <div>
      <h1>PiHealth360 Payment Test</h1>
      {!user && <button onClick={handleAuthenticate}>Authenticate</button>}
      {user && <button onClick={handlePayment}>Make Payment</button>}
    </div>
  );
};

export default App;