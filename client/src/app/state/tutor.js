import "whatwg-fetch";
import { fetchFromAPI } from "./utils";
import { sayIt, findLanguage } from "./utils";
import { setStudentResponse } from "./student";

const DEFAULT_VOICE = "fr-FR";

/*********************************************************************
||  Define the initial reducer state
*********************************************************************/

export const INITIAL_STATE = {
  language: 0,
  rate: 100,
  prompt: "Click the button to get started",
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

export function setTutorDefaultLanguage() {
  return async (dispatch, getState) => {
    dispatch(setTutorField("language", findLanguage(DEFAULT_VOICE)));
  };
}

export function translateText(text, language) {
  return async (dispatch, getState) => {
    var voices = await speechSynthesis.getVoices();
    dispatch(
      fetchFromAPI(
        "/api/translate",
        { text: text, language: voices[language]["lang"] },
        (data) => {
          console.log(data);
          dispatch(setStudentResponse(data["translation"]));
        },
        (err) => {
          console.log(err);
        }
      )
    );
  };
}

export function setTutorPrompt() {
  // Get a random number
  function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  // Return a random element from an array
  function randomElement(items) {
    var item = items[Math.floor(Math.random() * items.length)];
    return item;
  }

  return async (dispatch, getState) => {
    const wl = getState()["Settings"]["vocabulary"];
    const mode = getState()["Settings"]["mode"];
    console.log("mode is", mode);

    let targetWord = "";

    switch (mode) {
      case "numbers":
        targetWord = randomNumber(
          getState()["Settings"]["numbers_lower_bound"],
          getState()["Settings"]["numbers_upper_bound"]
        );
        break;
      case "dates":
        const weekday = randomElement(wl["days"]);
        const month = randomElement(wl["months"]);
        const day = randomNumber(1, 31);
        const dt = `${weekday}, ${month} ${day}`;
        targetWord = dt;
        break;
      case "prepositions":
        targetWord = randomElement(wl["prepositions"]);
        break;
      default:
        targetWord = "Invalid setting!!!";
    }

    dispatch(setTutorField("prompt", targetWord));

    dispatch(translateText(targetWord, getState().Tutor.language));
    sayIt(targetWord, getState().Student.language);
  };
}

export default Main;
