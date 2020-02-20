const express = require("express");
const User = require("../models/User");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

router.post("/user/sign_up", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });

    if (user) {
      res.json({ message: "l'utilisateur existe déja" });
    } else {
      if (req.fields.email && req.fields.password && req.fields.username) {
        const token = uid2(16);
        const salt = uid2(64);
        const hash = SHA256(req.fields.password + salt).toString(encBase64);

        const user = new User({
          email: req.fields.email,
          token: token,
          hash: hash,
          salt: salt,
          account: {
            username: req.fields.username
          }
        });

        await user.save();

        res.json({
          _id: user.id,
          token: user.token,
          account: user.account
        });
      } else {
        res.json({ message: "missing parameters" });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
});

router.post("/user/log_in", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });
    console.log(user.hash);
    if (user) {
      if (
        user.hash ===
        SHA256(req.fields.password + user.salt).toString(encBase64)
      ) {
        res.json({
          _id: user.id,
          token: user.token,
          account: user.account
        });
      } else {
        res.status(401).json({ error: "unauthorized" });
      }
    } else {
      res.status(401).json({ error: "user does not exist" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
