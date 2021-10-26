import axios from "axios";
import {
    GET_SUITABILITY,
    ADD_SUITABILITY,
    DELETE_SUITABILITY,
} from "./types";

// GET Suitability
export const getSuitability = () => (dispatch, getState) => {
    axios
        .get("/api/suitability/suitability/", tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_SUITABILITY,
                payload: res.data,
            });
        });
};

// Add Suitability
export const addSuitability = (sname, description, weights) => (dispatch, getState) => {
    const form_data = JSON.stringify({sname, description, weights});
    axios
        .post("/api/suitability/suitability/", form_data, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_SUITABILITY,
                payload: res.data,
            });
        });
};

// Delete Suitability
export const deleteSuitability = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/suitability/suitability/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_SUITABILITY,
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

//Setup config with token - helper function
export const tokenConfigFile = (getState) => {
    const token = getState().auth.token;
    const config = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
};