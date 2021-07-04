import { fetchFromAPI } from "./utils";
import "whatwg-fetch";

/*********************************************************************
||  Define the initial reducer state
*********************************************************************/

export const INITIAL_STATE = {
  voices: [],
  speech_synthesis_api_supported: true,
  practice_type: "listening",
  vocabulary: {},
  mode: "numbers",
  numbers_lower_bound: 0,
  numbers_upper_bound: 100,
};

/*********************************************************************
  ||  Reducer
  *********************************************************************/
function Main(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "setSettingsField":
      return Object.assign({}, state, { [action.key]: action.val });
    default:
      return state;
  }
}

/*********************************************************************
  ||  Actions
  *********************************************************************/
export function setSettingsField(key, val) {
  return { type: "setSettingsField", key, val };
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
          dispatch(setSettingsField("vocabulary", data));
        },
        (err) => {
          console.log(err);
        }
      )
    );
  };
}

export default Main;
