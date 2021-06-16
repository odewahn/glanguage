import { combineReducers } from "redux";
import Vocabulary from "./state/vocabulary.js";
import Settings from "./state/settings.js";

const rootReducer = combineReducers({
  Vocabulary,
  Settings,
});
export default rootReducer;
