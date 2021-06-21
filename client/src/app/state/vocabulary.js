import { fetchFromAPI } from "./utils";

/*********************************************************************
||  Define the initial reducer state
*********************************************************************/

export const INITIAL_STATE = {
  wordlist: {},
  target: "Click the button",
};

/*********************************************************************
  ||  Reducer
  *********************************************************************/
function Main(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "setVocabularyField":
      return Object.assign({}, state, { [action.key]: action.val });
    default:
      return state;
  }
}

/*********************************************************************
  ||  Actions
  *********************************************************************/
export function setVocabularyField(key, val) {
  return { type: "setVocabularyField", key, val };
}

export function fetchVocabulary() {
  return async (dispatch, getState) => {
    console.log("doin it!");
    dispatch(
      fetchFromAPI(
        "/api/vocabulary",
        {},
        (data) => {
          console.log(data);
          dispatch(setVocabularyField("wordlist", data));
        },
        (err) => {
          console.log(err);
        }
      )
    );
  };
}

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Return a random element from an array
function randomElement(items) {
  var item = items[Math.floor(Math.random() * items.length)];
  return item;
}
export function setTarget() {
  return async (dispatch, getState) => {
    const wl = getState()["Vocabulary"]["wordlist"];
    const mode = getState()["Settings"]["mode"];
    console.log("mode is", mode);

    switch (mode) {
      case "numbers":
        dispatch(
          setVocabularyField(
            "target",
            randomNumber(
              getState()["Settings"]["numbers_lower_bound"],
              getState()["Settings"]["numbers_upper_bound"]
            )
          )
        );
        break;
      case "dates":
        const weekday = randomElement(wl["days"]);
        const month = randomElement(wl["months"]);
        const day = randomNumber(1, 31);
        const dt = `${weekday}, ${month} ${day}`;
        dispatch(setVocabularyField("target", dt));
        break;
      case "prepositions":
        dispatch(
          setVocabularyField("target", randomElement(wl["prepositions"]))
        );
        break;
      default:
        dispatch(setVocabularyField("target", "Invalid setting!!!"));
    }
  };
}

export default Main;
