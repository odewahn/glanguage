import "whatwg-fetch";
import { fetchFromAPI } from "./utils";
import { sayIt } from "./utils";

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
  console.log("looking for language", language);
  return (dispatch, getState) => {
    var voices = getState().Settings.voices;
    console.log("language is ", language);
    dispatch(
      fetchFromAPI(
        "/api/translate",
        { text: text, language: voices[language]["lang"] },
        (data) => {
          console.log(data);
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

    dispatch(setPromptField("prompt", targetWord));
    dispatch(translateText(targetWord, getState().Tutor.language));
  };
}

// Says the prompt based on the users lerning mode
// If the mode is speaking, then the student listents in their language and responds in the tutor (i.e., en->fr)
// If the mode is listening, the student listens in their tutors language and responds in the own (i.e., fr->en)
export function sayPrompt() {
  return (dispatch, getState) => {
    var targetWord = getState().Prompt.prompt_translation;
    var targetLanguage = getState().Tutor.language;
    var targetRate = getState().Tutor.rate;
    if (getState().Settings.practice_type === "speaking") {
      targetWord = getState().Prompt.prompt;
      targetLanguage = getState().Student.language;
      targetRate = 100;
    }
    console.log("saying something???", targetWord, targetLanguage);
    sayIt(targetWord, targetLanguage, targetRate);
  };
}

export default Main;
