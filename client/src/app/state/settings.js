import { fetchFromAPI } from "./utils";
import "whatwg-fetch";

/*********************************************************************
||  Define the initial reducer state
*********************************************************************/

export const INITIAL_STATE = {
  tutor_language: 0,
  student_language: 0,
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

export default Main;
