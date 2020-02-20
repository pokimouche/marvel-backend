const express = require("express");
const cors = require("cors");
const formidableMiddleware = require("express-formidable");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");
const favoriteRoutes = require("./routes/favorite");
const userRoutes = require("./routes/user");

const app = express();
app.use(cors());
app.use(formidableMiddleware());
app.use(charactersRoutes);
app.use(comicsRoutes);
app.use(favoriteRoutes);
app.use(userRoutes);
app.all("*", (req, res) => {
  res.json({ message: "all routes" });
});
app.listen(process.env.PORT, () => {
  console.log("server has started");
});
