import axios from "axios";
import {
    GET_VECTOR,
    ADD_VECTOR,
    // UPDATE_VECTOR,
    DELETE_VECTOR,
} from "./types";

// GET Vector
export const getVector = () => (dispatch, getState) => {
    axios
        .get("/api/suitability/vector/", tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_VECTOR,
                payload: res.data,
            });
        });
};

// Add Vector
export const addVector = (name, description) => (dispatch, getState) => {
    //Request body
    const body = JSON.stringify({ "name":name, "description":description });

    axios
        .post("/api/suitability/vector/", body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_VECTOR,
                payload: res.data,
            });
        });
};

// Delete Vector
export const deleteVector = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/suitability/vector/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_VECTOR,
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