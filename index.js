const express = require("express");
const path = require("path");

// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

// Convert the base64 encoded credentials to an object
var ascii = new Buffer.from(process.env.CREDS64, "base64").toString("ascii");
let creds = JSON.parse(ascii);

var users = require("./routes/users");
var vocabulary = require("./routes/vocabulary");
var translate = require("./routes/translate");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/users", users);
app.use("/api/vocabulary", vocabulary);
app.use("/api/translate", translate);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Listening on ${port}`);
