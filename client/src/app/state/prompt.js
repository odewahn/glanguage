import "whatwg-fetch";
import { fetchFromAPI } from "./utils";
import { setStudentField } from "./student";
import { setTutorField } from "./tutor";

/*********************************************************************
||  Define the initial reducer state
*********************************************************************/

export const INITIAL_STATE = {
  prompt: "Click the button to get started",
  prompt_translation: "",
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
  return { type: "setPromptField", key, val };
}

export function translateText(text, language) {
  return (dispatch, getState) => {
    dispatch(
      fetchFromAPI(
        "/api/translate",
        { text: text, language: language },
        (data) => {
          dispatch(setPromptField("prompt_translation", data["translation"]));
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
        const dt = `${weekday} ${month} ${day}`;
        targetWord = dt;
        break;
      case "prepositions":
        targetWord = randomElement(wl["prepositions"]);
        break;
      default:
        targetWord = "Invalid setting!!!";
    }
    dispatch(setPromptField("prompt", targetWord));
    const targetLanguage =
      getState().Tutor.voices_lookup[getState().Tutor.voice_idx].language;
    console.log("Target language to translate is", targetLanguage);
    dispatch(translateText(targetWord, targetLanguage));
    dispatch(setStudentField("response_in_progress", ""));
  };
}

export default Main;
