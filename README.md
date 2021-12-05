This is a basic starter template for a react + express app that is easily deployed to Heroku. Add API routes in the `./routes` directory. Add new react components in the `./client/src/components` directory. When you're done, push it to Heroku and 😍.

Good article

- https://daveceddia.com/create-react-app-express-backend/
- https://daveceddia.com/deploy-react-express-app-heroku/
- Set up material UI -- https://www.pluralsight.com/guides/installing-and-using-material-ui-with-react
- Set up redux -- https://medium.com/coox-tech/how-to-setup-redux-with-react-2020-adb8cad90234

# Starting Express

`PORT=3001 nodemon ./bin/www`

# Running it

## Start the express server

In the root directory, run:

```
nodemon npm run start
```

## Start the react frontend

In the `./client` directory, run:

```
npm start
```

# Translation stuff

Use https://cloud.google.com/speech-to-text/ to create a conversational partner for learning a language

- https://cloud.google.com/speech-to-text/docs/streaming-recognize

- https://www.twilio.com/blog/audio-visualisation-web-audio-api--react -- react tutorial on waveform analysis

- https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b

# Speech Recognition and synthesis

- https://github.com/JamesBrill/react-speech-recognition

- https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

# Other stuff

- https://stackoverflow.com/questions/50976084/how-do-i-stream-live-audio-from-the-browser-to-google-cloud-speech-via-socket-io

- https://github.com/googleapis/nodejs-speech

- https://github.com/idevelop/google-cloud-speech-webaudio

- https://stackoverflow.com/questions/57507737/send-microphone-audio-recorder-from-browser-to-google-speech-to-text-javascrip

- https://fostermade.co/blog/making-speech-to-text-work-with-react-native-and-expo

https://bareynol.github.io/mui-theme-creator/

# Google Translate API

- https://medium.com/analytics-vidhya/how-to-use-google-cloud-translation-api-with-nodejs-6bdccc0c2218

- https://stackoverflow.com/questions/49664844/use-google-service-account-securely-with-heroku

- https://github.com/googleapis/google-auth-library-nodejs#loading-credentials-from-environment-variables

- https://neliosoftware.com/blog/how-to-generate-an-api-key-for-google-translate/?nab=1

```
http https://translation.googleapis.com/language/translate/v2 \
   q==today \
   key==<THE KEY> \
   source==en \
   target==fr \
   format==text
```

Returns

```
{
    "data": {
        "translations": [
            {
                "translatedText": "aujourd'hui"
            }
        ]
    }
}
```

# Using service account credentials with Heroku

- First [create a service account](https://www.labnol.org/code/20365-create-google-service-accounts). Make sure you give it permissions to use the translate API.

- Download the json credential file. It will look something like this:

```
{
  "type": "service_account",
  "project_id": "andrews-test-repo",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...n-----END PRIVATE KEY-----\n",
  "client_email": "glanguage@andrews-test-repo.iam.gserviceaccount.com",
  "client_id": "105478075033733846731",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/glanguage%40andrews-test-repo.iam.gserviceaccount.com"
}
```

- Save the file, and then use the bash `base64` utility to encode it

```
$ base64 < andrews-test-repo-5d6a78cfbde4.json
```

- Once you have it encoded, you can safely use it as an environment variable in a `.env` file or as a Heroku environment variable

- To decode it, use the `Buffer.from` function, like this:

```
var ascii = new Buffer.from(process.env.CREDS64, "base64").toString("ascii");
let creds = JSON.parse(ascii);
```

- Finally, it's also worth noting how to actuall pass it to the translation SDK:

```
const translate = new Translate({
   project_id: creds["project_id"],
   credentials: {
      client_email: creds["client_email"],
      private_key: creds["private_key"],
   },
});
```

# Lessons

Goal: Get to the prefociency of an 8-year old.

As I've gotten through the basic mechanics and have tried to actually _learn_ a lanuage with this, I've realized I need a more structured approach. Hence, lessons.

The idea of a lesson is simple: you have a set of words (say 20) that you work with sequentially. There would be three (four?) phases:

- For each word in the list, the tutor says it in your language, and then theirs. You just repeat what they say a few times until you get it right. (i.e., "Two. Deux." and then you say "Deux"). When you're ready, you move on to the next word _in order_. The answer you're suposed to say is always visible.
- Once you get through all the words, the tutor prompts you in her language and you respond in yours until you get it right (i.e., you're practicing listening). What you're supposed to say is blurred out so you can't see the answer, but you could unhide it at any point.
- Same as last step, but this time she says it in yours and you respond in hers (i.e., practice speaking)
- Randomly mixed set of listening and speaking.
- Have a sentence with the word mixed in, and you have to pick it out and say it (practice listening for specific words)

Additional notes:

- For efficiency and cost savings, the words in the lesson are all translated _in advance_, so pretty much everything is happeneing on the browser
- For the reinforced/time-based learning (Andy Matushak stuff), it would mix in words from lessons you'd completed previously to help you remember.
  - https://www.gwern.net/Spaced-repetition
- Each lesson would have a description the tutor would say at the beginning. You could also add language-specfic notes that it might also say, depending on the language. For example, for numbers in French, it might explain the counting system (how it uses groups of twenty for bigger numbers)

## Vocabulary / lesson ideas and sources

- https://preply.com/en/blog/most-common-french-words/
- Research study on spaced repition: https://www.gwern.net/docs/www/scholar.sun.ac.za/9578b93726899111f4a3d03bffc7d36f0f02d14d.pdf
- Researh on language learning courses -- https://www.wgtn.ac.nz/lals/resources/paul-nations-resources/paul-nations-publications/publications/documents/yamamoto-four-strands.pdf

# To Do / Notes

- Break out current "main" page "Answer/Question/Response" grid and functionality (including dictaphones and buttons) into a separate component. As top level properties, pass in:
- question
- question_language
- answer_language
- A callback function to do something with the results

Then handle all the complicated settings logic in the calling wrapper. This will also let me do better organize the code for things like adding lessons or having the GPT-3 conversation stuff, since I can make different top level components.

# Other services

- https://listmonk.app/ -- mail list manager
