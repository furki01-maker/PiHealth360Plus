// src/mountUserEndpoints.js
module.exports = function(app) {
  // Örnek endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
};