import { combineReducers } from "redux";
import auth from "./auth";
import messages from "./messages";
import ahp from "./ahp";
import project from "./project";

const rootReducer = combineReducers({
    auth,
    messages,
    ahp,
    project
}); 

export default rootReducer;