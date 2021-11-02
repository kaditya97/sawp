import axios from "axios";
import {
    GET_RASTER,
    ADD_RASTER,
    DELETE_RASTER,
} from "./types";

// GET Raster
export const getRaster = () => (dispatch, getState) => {
    axios
        .get("/api/suitability/raster/", tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_RASTER,
                payload: res.data,
            });
        });
};

// Download Raster
export const downloadRaster = id => (dispatch, getState) => {
    axios.get(`/api/suitability/download/raster/${id}`, tokenConfig(getState))
};

// Add Raster
export const addRaster = (form_data) => (dispatch, getState) => {
    axios
        .post("/api/suitability/raster/", form_data, tokenConfigFile(getState))
        .then((res) => {
            dispatch({
                type: ADD_RASTER,
                payload: res.data,
            });
        });
};

// Delete Raster
export const deleteRaster = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/suitability/raster/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_RASTER,
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