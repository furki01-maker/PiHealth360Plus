"use strict";

const platformAPIClient = require("../services/platformAPIClient");

function mountUserEndpoints(router) {

  // Kullanıcı giriş yapma
  router.post('/signin', async (req, res) => {
    try {
      const auth = req.body.authResult;
      const userCollection = req.app.locals.userCollection;

      // Pi API üzerinden kullanıcı bilgilerini al
      const me = await platformAPIClient.get("/v2/me", {
        headers: { 'Authorization': `Bearer` + auth.accessToken}
      });
      console.log(me.data);

      // Kullanıcı mevcut mu kontrol et
      let currentUser = await userCollection.findOne({ uid: auth.user.uid });

      if (currentUser) {
        // Mevcutsa accessToken güncelle
        await userCollection.updateOne(
          { _id: currentUser._id },
          { $set: { accessToken: auth.accessToken } }
        );
      } else {
        // Yoksa kullanıcıyı ekle
        const insertResult = await userCollection.insertOne({
          username: auth.user.username,
          uid: auth.user.uid,
          roles: auth.user.roles,
          accessToken: auth.accessToken
        });
        currentUser = await userCollection.findOne({ _id: insertResult.insertedId });
      }

      // Session'a kaydet
      req.session.currentUser = currentUser;
      return res.status(200).json({ message: "User signed in" });

    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: "Invalid access token" });
    }
  });

  // Kullanıcı çıkış yapma
  router.get('/signout', async (req, res) => {
    req.session.currentUser = null;
    return res.status(200).json({ message: "User signed out" });
  });

}

module.exports = mountUserEndpoints;