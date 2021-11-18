import "whatwg-fetch";

// Used to get language names from codes
import ISO6391 from "iso-639-1";

// Used to get country names from codes
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
const countryList = countries.getNames("en", { select: "official" });

/*********************************************************************
||  Define the initial reducer state
*********************************************************************/

export const INITIAL_STATE = {
  voice_idx: -1,
  rate: 100,
  voices: {},
  voices_lookup: [],
};

/*********************************************************************
||  Reducer
*********************************************************************/
function Main(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "setTutorField":
      return Object.assign({}, state, { [action.key]: action.val });
    default:
      return state;
  }
}

/*********************************************************************
||  Actions
*********************************************************************/
export function setTutorField(key, val) {
  return { type: "setTutorField", key, val };
}

// Remaps voices into a form suitable for presenting in a UI
export function remapVoices() {
  var remap = {};
  var lookup = [];

  speechSynthesis.getVoices().map((speaker, idx) => {
    var speakerLangageCountryCode = speaker.lang.split("-");

    var languageCode = speakerLangageCountryCode[0];
    var languageName = ISO6391.getName(languageCode);

    var countryCode =
      speakerLangageCountryCode.length > 1
        ? speakerLangageCountryCode[1].toUpperCase()
        : "*";
    var countryName = countryList[countryCode];

    const speaker_voice =
      languageName + " (" + speaker.name + " from " + countryName + ")";

    // This is the languaage as it will appear in a select list
    var newLang = {
      original_idx: idx,
      language: speaker.lang,
      language_code: languageCode,
      language_name: languageName,
      country_code: countryCode,
      country_name: countryName,
      speaker_voice: speaker_voice,
    };

    // Add record to lookup table
    lookup.push(newLang);

    // Add the record to the remapped structure
    if (languageName in remap) {
      remap[languageName].push(newLang);
    } else {
      remap[languageName] = [newLang];
    }
  });

  return [remap, lookup];
}

// Say the given phrase in the given voice
export function sayIt(phrase, voice_idx, utterance_rate = 100) {
  const voices = speechSynthesis.getVoices();
  var utterance = new window.SpeechSynthesisUtterance(phrase);
  utterance.rate = 0.5 + (0.5 * utterance_rate) / 100.0;
  utterance.voice = voices[voice_idx];
  speechSynthesis.speak(utterance);
}

// Return the first voice that speaks the giving language
export function findVoiceByLanguage(language_name, voices_lookup) {
  var retVal = 0;
  voices_lookup.map((v, idx) => {
    if (v.language_name == language_name) {
      retVal = idx;
    }
  });
  return retVal;
}

export default Main;
