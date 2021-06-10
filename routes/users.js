const express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
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
