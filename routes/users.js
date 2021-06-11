const express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.json([
    {
      id: 1,
      username: "johhnyrose",
    },
    {
      id: 3,
      username: "moirarose",
    },
  ]);
});

module.exports = router;
