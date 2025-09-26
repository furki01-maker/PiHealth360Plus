import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// globals.d.ts veya index.tsx
declare global {
  interface Window {
    Pi?: any;
  }
}

// Pi SDK başlatma
if (typeof window !== "undefined" && window.Pi) {
  window.Pi.init({
    version: "2.0",
    sandbox: true, // sandbox modda test için
  });
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);