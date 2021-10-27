import { combineReducers } from "redux";

import Settings from "./state/settings.js";
import Tutor from "./state/tutor.js";
import Student from "./state/student.js";
import Prompt from "./state/prompt";

const rootReducer = combineReducers({
  Settings,
  Tutor,
  Student,
  Prompt,
});
export default rootReducer;
