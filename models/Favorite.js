const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  category: { type: String, enum: ["comics", "characters"] },
  favoriteId: { type: Number },
  favoriteUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Favorite;
