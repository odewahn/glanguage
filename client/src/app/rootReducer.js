import { combineReducers } from "redux";

import Settings from "./state/settings.js";
import Tutor from "./state/tutor.js";
import Student from "./state/student.js";

const rootReducer = combineReducers({
  Settings,
  Tutor,
  Student,
});
export default rootReducer;
