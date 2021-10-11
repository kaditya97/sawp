import axios from "axios";
import {
  CALCULATE_AHP
} from "./types";

// Check token and load user
export const calcAhp = (data) => (dispatch, getState) => {
  //Request body
  const body = JSON.stringify(data);
  axios
    .post("/api/suitability/ahp/", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CALCULATE_AHP,
        payload: res.data,
      });
    });
};

// calculate ahp
export const calculateAhp = () => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({ 'school': 1 / 3, 'hospital': 1 / 2, 'fuel': 3 });

  axios
    .post("/api/suitability/ahp", body, config)
    .then((res) => {
      dispatch({
        type: CALCULATE_AHP,
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