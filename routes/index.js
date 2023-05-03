const express = require("express");
const TinyUrl = require("../database/model");
const router = express.Router();
const crypto = require("crypto");

router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.get("/new/:id", async (req, res) => {
  const url = await TinyUrl.findOne({ where: { shortUrl: req.params.id } });

  if (!url) return res.status(500).send("An error occured");
  else {
    return res.redirect(url.longUrl);
  }
});

router.post("/shortener", async (req, res) => {
  const url = await TinyUrl.findOne({ where: { longUrl: req.body.longUrl } });

  if (!url) {
    const urlCreated = await TinyUrl.create({
      longUrl: req.body.longUrl,
      shortUrl: `${crypto
        .randomBytes(Math.floor(Math.random() * 10) + 1)
        .toString("hex")}`,
    });

    res.status(200).send(`http://localhost:3000/new/${urlCreated.shortUrl}`);
  } else {
    res.status(200).send(`http://localhost:3000/new/${url.shortUrl}`);
  }
});

module.exports = router;
