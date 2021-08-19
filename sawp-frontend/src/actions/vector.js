import axios from "axios";
import WMSCapabilities from "wms-capabilities";
import {
    GET_VECTOR,
    ADD_VECTOR,
    UPDATE_VECTOR,
    DELETE_VECTOR,
    ADD_BBOX,
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
export const addVector = (form_data) => (dispatch, getState) => {
    axios
        .post("/api/suitability/vector/", form_data, tokenConfigFile(getState))
        .then((res) => {
            dispatch({
                type: ADD_VECTOR,
                payload: res.data,
            });
        });
};

// Update Vector
export const updateVector = (form_data) => (dispatch, getState) => {
    axios
        .put("/api/suitability/vector/", form_data, tokenConfigFile(getState))
        .then((res) => {
            dispatch({
                type: UPDATE_VECTOR,
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

export const addBbox = (layer) => (dispatch) => {
    const { layer_name, workspace } = layer;
    axios({
      method: "get",
      url: `/wms?service=wms&version=1.1.1&request=GetCapabilities&rootLayer=false&namespace=${workspace}:${layer_name}`,
      baseURL: process.env.REACT_APP_GEOSERVER_URL,
    }).then((res) => {
      const json = new WMSCapabilities(res.data).toJSON();
      const layers = json?.Capability?.Layer?.Layer;
      const layer = layers?.filter(
        (l) => l.Name === `${workspace}:${layer_name}`
      )[0];
      const bbox = layer?.LatLonBoundingBox;
  
      dispatch({
        type: ADD_BBOX,
        payload: bbox,
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