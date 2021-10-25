import axios from "axios";
import {
    GET_LAYERS,
    GET_STYLES,
} from "./types";

// var user = "admin";
// var pass = "geoserver";
// var authorizationBasic = window.btoa(user + ':' + pass);
// var config = {
//     "headers": {
//         "Authorization": "Basic " + authorizationBasic
//     }
// };
// Get Layers
export const getLayers = () => (dispatch) => {
    axios({
        method: "get",
        url: `/rest/workspaces/sawp/layers.json`,
        baseURL: process.env.REACT_APP_GEOSERVER_URL,
    }).then((res) => {
        dispatch({
            type: GET_LAYERS,
            payload: res.data,
        });
    });
};

// Get Styles
export const getRasterStyles = () => (dispatch) => {
    var username = "admin";
    var password = "geoserver";
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
    axios({
        method: "get",
        url: `/rest/workspaces/sawp/styles.json`,
        baseURL: process.env.REACT_APP_GEOSERVER_URL,
        headers: {
            'Authorization': `Basic ${token}`
        },
    }).then((res) => {
        dispatch({
            type: GET_STYLES,
            payload: res.data,
        });
    });
};

// Get Styles
export const getVectorStyles = () => (dispatch) => {
    var username = "admin";
    var password = "geoserver";
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
    axios({
        method: "get",
        url: `/rest/styles.json`,
        baseURL: process.env.REACT_APP_GEOSERVER_URL,
        headers: {
            'Authorization': `Basic ${token}`
        },
    }).then((res) => {
        dispatch({
            type: GET_STYLES,
            payload: res.data,
        });
    });
};

// Add Styles
export const addStyles = (styles) => (dispatch) => {
    var username = "admin";
    var password = "geoserver";
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
    axios({
        method: "post",
        url: `/rest/workspaces/sawp/styles.json`,
        baseURL: process.env.REACT_APP_GEOSERVER_URL,
        data: styles,
        headers: {
            'Authorization': `Basic ${token}`
        },
    }).then((res) => {
    dispatch({
        type: GET_STYLES,
        payload: res.data,
    });
});
};
