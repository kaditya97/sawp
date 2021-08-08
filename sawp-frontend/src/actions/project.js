import axios from "axios";
import {
    GET_PROJECT,
    ADD_PROJECT
} from "./types";

// GET Project
export const getProject = () => (dispatch, getState) => {
    axios
        .get("/api/suitability/project/", tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_PROJECT,
                payload: res.data,
            });
        });
};

// Add Project
export const addProject = (name, description) => (dispatch, getState) => {
    //Request body
    const body = JSON.stringify({ "name":name, "description":description });

    axios
        .post("/api/suitability/project/", body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_PROJECT,
                payload: res.data,
            });
        });
};

//Setup config with token - helper function
export const tokenConfig = (getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {
            "content-type": "application/json",
        },
    };
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
};