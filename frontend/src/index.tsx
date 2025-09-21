import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Pi SDK başlatma
declare global {
  interface Window {
    Pi: any;
  }
}

if (window.Pi) {
  window.Pi.init({ version: "2.0", sandbox: true });
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);