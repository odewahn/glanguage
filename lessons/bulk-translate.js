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

async function doIt(text, target) {
  const [out, hash] = await translate.translate(text, target);
  return out;
}

async function main() {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
    "cat",
    "dog",
    "library",
    "In a hole in the ground there lived a hobbit.",
  ];
  const targets = ["fr", "de", "it", "nl"];
  var out = {};
  for (i = 0; i < targets.length; i++) {
    var x = await doIt(days, targets[i]);
    out[targets[i]] = x;
  }

  console.log(JSON.stringify(out, null, 2));
}

main();
