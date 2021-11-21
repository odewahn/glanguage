// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

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

// Remove the given substrings from a string
function removeTargets(str, targets) {
  targets.map((t) => {
    str = str.replace(t, "");
  });
  return str.trim();
}

// Translate the text array and language target
async function fetchTranslation(text, target) {
  const [out, hash] = await translate.translate(text, target);
  const retVal = out.map((s) => s.toLowerCase()); //Lowercase each element in the array
  return retVal;
}

async function main(languageCode) {
  var prompts = await fetchTranslation(lessonData.prompts, languageCode);

  var hints = [];
  if (lessonData.hasOwnProperty("hints")) {
    hints = await fetchTranslation(lessonData.hints, languageCode);
  }

  // Remove any strings used for disambiguation
  var cleaned = [];
  prompts.map((p) => {
    cleaned.push(removeTargets(p, hints));
  });

  // Now prepare the json output
  var outputPrompts = [];
  lessonData.prompts.map((p, idx) => {
    outputPrompts.push({
      prompt: removeTargets(p.toLowerCase(), lessonData.hints),
      prompt_translation: cleaned[idx],
    });
  });
  var final = Object.assign({}, { language: languageCode }, lessonData, {
    prompts: outputPrompts,
  });
  delete final["hints"];

  //out[targets[i]] = cleaned;

  console.log(JSON.stringify(final, null, 2));
}

main("fr");
//main("de");
