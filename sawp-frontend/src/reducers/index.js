import { combineReducers } from "redux";
import auth from "./auth";
import messages from "./messages";
import ahp from "./ahp";
import project from "./project";
import raster from "./raster";
import vector from "./vector";
import boundary from "./boundary";

const rootReducer = combineReducers({
    auth,
    messages,
    ahp,
    project,
    raster,
    vector,
    boundary
}); 

export default rootReducer;