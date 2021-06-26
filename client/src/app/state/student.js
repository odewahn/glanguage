import { findLanguage } from "./utils";
const DEFAULT_VOICE = "en-US";

/*********************************************************************
||  Define the initial reducer state
*********************************************************************/

export const INITIAL_STATE = {
  language: 0,
  response: "",
};

/*********************************************************************
  ||  Reducer
  *********************************************************************/
function Main(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "setStudentField":
      return Object.assign({}, state, { [action.key]: action.val });
    default:
      return state;
  }
}

/*********************************************************************
  ||  Actions
  *********************************************************************/
export function setStudentField(key, val) {
  return { type: "setStudentField", key, val };
}

export function setStudentDefaultLanguage() {
  return async (dispatch, getState) => {
    dispatch(setStudentField("language", findLanguage(DEFAULT_VOICE)));
  };
}

export function setStudentResponse(r) {
  return async (dispatch, getState) => {
    dispatch(setStudentField("response", r));
  };
}

export default Main;
