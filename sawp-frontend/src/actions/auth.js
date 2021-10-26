import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Login
export const login = (username, password) => (dispatch) => {
  //user loading
  dispatch({ type: USER_LOADING });
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_ERROR,
        payload: err.response.data,
      });
    });
};

// REGISTER USER
export const register = ({ username, email, password }) => (dispatch) => {
  //user loading
  dispatch({ type: USER_LOADING });
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({ username, password, email });

  axios
    .post("/api/auth/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data,
      });
    });
};

//logout user
export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout/", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
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

//Setup config with token - for file type
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


//Setup config with token - for file type
export const tokenConfigFileUpload = (getState, options) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
    ...options,
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};