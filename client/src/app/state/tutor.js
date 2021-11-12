import "whatwg-fetch";
import { findLanguage } from "./utils";

const DEFAULT_LANGUAGE = "fr-FR";

/*********************************************************************
||  Define the initial reducer state
*********************************************************************/

export const INITIAL_STATE = {
  language: 0,
  language_code: "",
  rate: 100,
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
    dispatch(setTutorField("language", findLanguage(DEFAULT_LANGUAGE)));
  };
}

export default Main;
