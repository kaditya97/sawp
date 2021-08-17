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

// Add Raster
export const addRaster = (name, description) => (dispatch, getState) => {
    //Request body
    const body = JSON.stringify({ "name":name, "description":description });

    axios
        .post("/api/suitability/raster/", body, tokenConfig(getState))
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