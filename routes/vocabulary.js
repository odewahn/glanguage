const express = require("express");
var router = express.Router();
const path = require("path");

const fs = require("fs");
YAML = require("yaml");

const fn = path.join(__dirname, "../vocabulary.yml");

// Loads vocabulary words from the YML file in the root directory
router.get("/", function (req, res, next) {
  const vocabulary = fs.readFileSync(fn, "utf8");
  res.json(YAML.parse(vocabulary));
});

module.exports = router;
