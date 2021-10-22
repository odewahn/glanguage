const express = require("express");
var router = express.Router();
const { Translate } = require("@google-cloud/translate").v2;

// Convert the base64 encoded credentials to an object
var ascii = new Buffer.from(process.env.CREDS64, "base64").toString("ascii");
let creds = JSON.parse(ascii);

// Create the client
const translate = new Translate({
  project_id: creds["project_id"],
  credentials: {
    client_email: creds["client_email"],
    private_key: creds["private_key"],
  },
});

router.get("/", async function (req, res, next) {
  console.log(req.query);
  // The text to translate
  const text = req.query.text;
  const target = req.query.language.split("-")[0];

  // Translates the
  const [translation] = await translate.translate(text, target);

  res.json({ translation: translation });
});

module.exports = router;
