import {
  GET_STYLE,
  PATCH_STYLE,
  GET_SLD,
} from "./types";
import axios from "axios";

export const getSld = (id) => (dispatch) => {
  axios
    .get(`/api/styles/sld_generator/?style_id=${id}`)
    .then((res) => {
      dispatch({ type: GET_SLD, payload: res.data });
    })
    .catch((err) =>
      dispatch(err.response.data)
    );
};

export const getStyle = (id) => (dispatch) => {
  axios
    .get(`/api/styles/sldstyle/${id}/`)
    .then((res) => {
      dispatch({ type: GET_STYLE, payload: res.data });
    })
};

export const patchStyle = (style, id) => (dispatch) => {
  console.log(style);
  console.log(id);
  axios
    .put(`/api/styles/sldstyle/6/`, style)
    .then((res) => {
      console.log(res);
      dispatch({ type: PATCH_STYLE, payload: res.data });
    })
};