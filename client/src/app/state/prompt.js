import "whatwg-fetch";
import { fetchFromAPI } from "./utils";
import { sayIt } from "./utils";

/*********************************************************************
||  Define the initial reducer state
*********************************************************************/

export const INITIAL_STATE = {
  prompt: "Click the button to get started",
  prompt_translation: "Translating...",
};

/*********************************************************************
||  Reducer
*********************************************************************/
function Main(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "setPromptField":
      return Object.assign({}, state, { [action.key]: action.val });
    default:
      return state;
  }
}

/*********************************************************************
||  Actions
*********************************************************************/
export function setPromptField(key, val) {
  return { type: "setTutorField", key, val };
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
          dispatch(setTutorField("prompt_translation", data["translation"]));
        },
        (err) => {
          console.log(err);
        }
      )
    );
  };
}

export function setPrompt() {
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

    await dispatch(setTutorField("prompt", targetWord));
    await dispatch(translateText(targetWord, getState().Tutor.language));
  };
}

export function sayPrompt() {
  return (dispatch, getState) => {
    var targetWord = getState().Tutor.prompt;
    var targetLanguage = getState().Tutor.language;
    console.log(getState().Settings.practice_type);
    if (getState().Settings.practice_type === "speaking") {
      targetWord = getState().Student.prompt;
      targetLanguage = getState().Student.language;
    }
    sayIt(targetWord, targetLanguage, getState().rate);
  };
}

export default Main;
