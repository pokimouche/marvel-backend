const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/favorite/create", isAuthenticated, async (req, res) => {
  try {
    //check existence of the id
    const checkId = await Favorite.findOne({
      favoriteId: req.fields.favoriteId
    });
    if (checkId === null) {
      favorite = new Favorite({
        favoriteId: req.fields.favoriteId,
        category: req.fields.category,
        favoriteUser: req.user
      });

      await favorite.save();
      res.status(200).json(favorite.populate("user"));
    } else {
      res.status(200).json({ message: "Ce favori est déja enregistré" });
    }
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/favorites", isAuthenticated, async (req, res) => {
  try {
    console.log("user", req.user);
    favorite = await Favorite.find({
      favoriteUser: { _id: req.user._id }
    }).select("favoriteId category");

    res.json(favorite);
  } catch (error) {
    res.json(error.message);
  }
});

router.post("favorite/delete", isAuthenticated, async (req, res) => {
  try {
    if (req.fields.id) {
      const favorite = await Favorite.findOne({ favoriteId: req.fields.id });
      if (favorite) {
        await task.remove();
        res.status(200).json({ message: "Le favori a été supprimé" });
      } else {
        res.status(400).json({ message: "Le favori" });
      }
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
