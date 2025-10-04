const axios = require("axios");

module.exports = function(app) {
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Pi Wallet verification
  app.post("/api/verify", async (req, res) => {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ error: "AccessToken missing" });
    }

    try {
      const response = await axios.get("https://api.minepi.com/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // Kullanıcı bilgilerini al
      const user = response.data;

      // MongoDB’ye kaydetmek istersen
      const userCollection = req.app.locals.userCollection;
      await userCollection.updateOne(
        { uid: user.uid },
        { $set: user },
        { upsert: true }
      );

      res.json({ success: true, user });
    } catch (error) {
      console.error("Verification failed:", error.response?.data || error.message);
      res.status(500).json({ error: "Verification failed" });
    }
  });
};