const express = require("express");
const router = express.Router();
const md5 = require("md5");

const axios = require("axios");
const timeStamp = Math.floor(Date.now() / 1000);
const hash = md5(
  timeStamp + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY
);

router.get("/characters", async (req, res) => {
  const search =
    req.query.nameStartsWith === undefined
      ? ""
      : `&nameStartsWith=${req.query.nameStartsWith}`;

  const offset =
    req.query.offset === undefined ? 0 : parseInt(req.query.offset);
  const limit = 100;
  const marvelUrl = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${hash}&offset=${offset}&limit=${limit}&orderBy=name${search}`;

  try {
    const response = await axios.get(marvelUrl);

    res.status(200).json({ message: response.data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/characters/:id/comics", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${timeStamp}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${hash}`
    );

    res.status(200).json({ message: response.data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
