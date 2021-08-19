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
export const addBoundary = (form_data) => (dispatch, getState) => {
    axios
        .post("/api/suitability/boundary/", form_data, tokenConfigFile(getState))
        .then((res) => {
            dispatch({
                type: ADD_BOUNDARY,
                payload: res.data,
            });
        });
};

// Update Boundary
export const updateBoundary = (form_data, id) => (dispatch, getState) => {
    axios
        .put(`/api/suitability/boundary/${id}/`, form_data, tokenConfigFile(getState))
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