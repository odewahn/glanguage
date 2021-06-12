import { fetchFromAPI } from "./utils";

/*********************************************************************
||  Define the initial reducer state
*********************************************************************/

export const INITIAL_STATE = {
  wordlist: {},
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

export default Main;
