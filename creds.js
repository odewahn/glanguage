// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

// Convert the base64 encoded credentials to an object
var ascii = new Buffer.from(process.env.CREDS64, "base64").toString("ascii");
let creds = JSON.parse(ascii);

// Create the client
const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate({
  project_id: creds["project_id"],
  credentials: {
    client_email: creds["client_email"],
    private_key: creds["private_key"],
  },
});

// Give it something to do
async function quickStart() {
  // The text to translate
  const text = "Hello, world!";

  // The target language
  const target = "fr";

  // Translates some text into Russian
  const [translation] = await translate.translate(text, target);
  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);
}

// Call it
quickStart();
