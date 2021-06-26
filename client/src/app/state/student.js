import { fetchFromAPI } from "./utils";
import "whatwg-fetch";

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

export function setStudentResponse(r) {
  return async (dispatch, getState) => {
    dispatch(setStudentField("response", r));
  };
}

export default Main;
