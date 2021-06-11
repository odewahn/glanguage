const express = require("express");
var router = express.Router();
const path = require("path");

const fs = require("fs");
YAML = require("yaml");

const fn = path.join(__dirname, "../vocabulary.yml");

router.get("/", function (req, res, next) {
  const vocabulary = fs.readFileSync(fn, "utf8");
  res.json(YAML.parse(vocabulary));
});

module.exports = router;
