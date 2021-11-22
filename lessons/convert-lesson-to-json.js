// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

const { Translate } = require("@google-cloud/translate").v2;

// Convert the base64 encoded credentials to an object
var ascii = new Buffer.from(process.env.CREDS64, "base64").toString("ascii");
let creds = JSON.parse(ascii);

// Create the translation client
const translate = new Translate({
  project_id: creds["project_id"],
  credentials: {
    client_email: creds["client_email"],
    private_key: creds["private_key"],
  },
});

// Get info about the file
const path = require("path");
const fs = require("fs");
YAML = require("yaml");

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Error.  Please provide a file name for a lesson file.");
  process.exit(-1);
}

// Grab the lesson file
const fn = path.join(__dirname, args[0]);
const dat = fs.readFileSync(fn, "utf8");
const lessonData = YAML.parse(dat);

// Translate the text array and language target
async function fetchTranslation(text, target) {
  const [out, hash] = await translate.translate(text, target);
  const retVal = out.map((s) => s.toLowerCase()); //Lowercase each element in the array
  return retVal;
}

async function main(languageCodes) {
  // Get all the translations for the languages
  var promptTranslations = {};

  for (var i = 0; i < languageCodes.length; i++) {
    var translations = await fetchTranslation(
      lessonData.prompts,
      languageCodes[i]
    );
    promptTranslations[languageCodes[i]] = translations;
  }

  // Now loop through and replace any exceptions for the tranlations
  if (lessonData.hasOwnProperty("overrides")) {
    const cleanPrompts = lessonData.prompts.map((s) => s.toLowerCase());
    lessonData.overrides.map((o) => {
      Object.keys(o).map((word) => {
        o[word].map((language) => {
          Object.keys(language).map((l) => {
            var word_idx = cleanPrompts.indexOf(word.toLowerCase());
            if (word_idx > -1) {
              promptTranslations[l][word_idx] = language[l];
            }
          });
        });
      });
    });
  }

  var final = Object.assign({}, lessonData, {
    translations: promptTranslations,
  });
  delete final["overrides"];

  console.log(JSON.stringify(final, null, 2));
}

main(["fr", "de", "it", "es"]);
