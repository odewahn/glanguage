const express = require("express");
var router = express.Router();
const path = require("path");

const fs = require("fs");

// Loads vocabulary words from the YML file in the root directory
router.get("/:lesson", function (req, res, next) {
  const slug = req.params.lesson;
  const fn = path.join(__dirname, "../translated-lessons/" + slug + ".json");
  const data = fs.readFileSync(fn, "utf8");
  res.json(JSON.parse(data));
});

module.exports = router;
