const axios = require("axios");

// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

//const res = await axios.post("https://httpbin.org/post", { answer: 42 });
console.log(process.env.API_KEY);

const req = axios
  .post("https://translation.googleapis.com/language/translate/v2", {
    q: "today",
    key: process.env.API_KEY,
    source: "en",
    target: "fr",
    format: "text",
  })
  .then((res) => {
    console.log(res.data);
  });
