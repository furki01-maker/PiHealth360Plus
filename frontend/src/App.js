// src/App.js
import React from "react";
import MyEditor from "./MyEditor";
import PaymentButton from "./components/PaymentButton";

const App = () => {
  return (
    <div
      className="App"
      style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "20px" }}
    >
      <h1>My React Editor & Pi Payment</h1>
      <MyEditor />
      <div style={{ marginTop: "30px" }}>
        <PaymentButton amount={1} receiver="TestReceiver" />
      </div>
    </div>
  );
};

export default App;