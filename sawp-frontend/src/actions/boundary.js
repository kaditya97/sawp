import axios from "axios";
import {
    GET_BOUNDARY,
    ADD_BOUNDARY,
    DELETE_BOUNDARY,
} from "./types";

// GET Boundary
export const getBoundary = () => (dispatch, getState) => {
    axios
        .get("/api/suitability/boundary/", tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_BOUNDARY,
                payload: res.data,
            });
        });
};

// Add Boundary
export const addBoundary = (name, description) => (dispatch, getState) => {
    //Request body
    const body = JSON.stringify({ "name":name, "description":description });

    axios
        .post("/api/suitability/boundary/", body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_BOUNDARY,
                payload: res.data,
            });
        });
};

// Update Boundary
export const updateBoundary = (id, name, description) => (dispatch, getState) => {
    //Request body
    const body = JSON.stringify({ "id":id, "name":name, "description":description });
    axios
        .put("/api/suitability/boundary/", body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_BOUNDARY,
                payload: res.data,
            }); 
        });
};

// Delete Boundary
export const deleteBoundary = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/suitability/boundary/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_BOUNDARY,
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