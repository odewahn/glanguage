import buildUrl from "build-url";

// Used to get language names from codes
import ISO6391 from "iso-639-1";

// Used to get country names from codes
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
const countryList = countries.getNames("en", { select: "official" });

// This is a private wrapper function that handles the error scenarios
// for fetch so that you can properly handle errors
// If expects the 3 functions -- one to do the actual fetch, a success handler
// and a failure handler
// Can provide a signal which represents an AbortController().signal that allows
// a fetch request to be cancelled as needed
export function fetchFromAPI(path, query, onSuccess, onFailure, signal) {
  return () => {
    fetch(
      buildUrl("/", {
        path,
        disableCSV: true,
        queryParams: query,
      }),
      { credentials: "same-origin", signal }
    )
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((data) => {
        onSuccess(data);
      })
      .catch((err) => {
        let msg;
        /* istanbul ignore next */
        if (err.statusText) {
          msg =
            "An error code " +
            err.status +
            " (" +
            err.statusText +
            ") has occurred";
        } else {
          msg = "An error occurred: " + err;
        }
        onFailure(err, msg);
      });
  };
}

// Say the given phrase in the given voice
export function sayIt(phrase, language_idx, utterance_rate = 100) {
  const voices = speechSynthesis.getVoices();
  var utterance = new window.SpeechSynthesisUtterance(phrase);
  utterance.rate = 0.5 + (0.5 * utterance_rate) / 100.0;
  utterance.voice = voices[language_idx];
  speechSynthesis.speak(utterance);
}

// Find the index for the first voice that matches the given language
// If not found, then just return the first voice [index = 0]
export function findLanguage(lang) {
  console.log("FINDING LANGUAGE FOR", lang);
  let retVal = 0;
  const voices = speechSynthesis.getVoices();
  console.log("voiices in the function are", voices);
  for (var i = 0; i < voices.length; i++) {
    if (voices[i].lang === lang) {
      retVal = i;
      break;
    }
  }
  console.log("VOICE IS", retVal);
  return retVal;
}

// Remaps voices into a form suitable for presenting in a UI
export function remapVoices() {
  var remap = {};
  speechSynthesis.getVoices().map((speaker, idx) => {
    var speakerLangageCountryCode = speaker.lang.split("-");

    var languageCode = speakerLangageCountryCode[0];
    var languageName = ISO6391.getName(languageCode);

    var countryCode =
      speakerLangageCountryCode.length > 1
        ? speakerLangageCountryCode[1].toUpperCase()
        : "*";
    var countryName = countryList[countryCode];

    var newLang = {
      country_code: countryCode,
      speaker_voice:
        speaker.name +
        " (" +
        languageName +
        " speaker from " +
        countryName +
        ")",
      original_idx: idx,
    };

    if (languageCode in remap) {
      remap[languageCode]["speakers"].push(newLang);
    } else {
      remap[languageCode] = {
        language_name: languageName,
        speakers: [newLang],
        language_code: speaker.lang,
      };
    }
  });
  return remap;
}
