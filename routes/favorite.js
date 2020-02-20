const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/favorite/create", isAuthenticated, async (req, res) => {
  try {
    favorite = new Favorite({
      favoriteId: req.fields.favoriteId,
      category: req.fields.categoryName,
      favoriteUser: req.user
    });

    await favorite.save();
    res.json(favorite.populate("user"));
  } catch (error) {
    res.json(error.message);
  }
});

// router.get("/favorite/id", isAuthenticated, async (req, res) => {
//   try {
//     favorite = await Favorite.find().populate({ _id: req.user.id });

//     res.json(favorite);
//   } catch (error) {
//     res.json(error.message);
//   }
// });

router.post("favorite/delete", isAuthenticated, async (req, res) => {
  try {
    if (req.fields.id) {
      const favorite = await Favorite.findById(req.fields.id);
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
