import {
  ADD_STYLE,
  GET_STYLES,
  DELETE_STYLE,
  UPDATE_STYLE,
  GET_STYLE,
  PATCH_STYLE,
  GET_SLD,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./auth";

export const getSld = (id) => (dispatch) => {
  // axios
  //   .get(`/api/styles/sld_generator/?style_id=${id}`)
  //   .then((res) => {
  //     dispatch({ type: GET_SLD, payload: res.data });
  //   })
  //   .catch((err) =>
  //     dispatch(err.response.data)
  //   );
};

export const getStyles = () => (dispatch) => {
  axios
    .get("/api/styles/sldstyle/")
    .then((res) => {
      dispatch({ type: GET_STYLES, payload: res.data });
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
    .catch((err) =>
      dispatch(err.response.data)
    );
};

export const patchStyle = (style, id) => (dispatch) => {
  // axios
  //   .patch(`/api/styles/sldstyle/${id}/`, style)
  //   .then((res) => {
  //     dispatch({ type: PATCH_STYLE, payload: res.data });
  //   })
  //   .catch((err) =>
  //     dispatch(err.response.data)
  //   );
};

export const addStyle = (style) => (dispatch, getState) => {
  axios
    .post("/api/styles/sldstyle/", style, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: ADD_STYLE, payload: res.data });
      dispatch(getStyle(res.data.id));
    })
    .catch((err) =>
      dispatch(err.response.data)
    );
};

export const deleteStyle = (id) => (dispatch) => {
  axios
    .delete(`/api/styles/sldstyle/${id}/`)
    .then((res) => {
      dispatch({ type: DELETE_STYLE, payload: id });
    })
    .catch((err) =>
      dispatch(err.response.data)
    );
};

export const updateStyle = (style, id) => (dispatch) => {
  axios
    .get(`/api/styles/sldstyle/${id}/`, style)
    .then((res) => {
      dispatch({ type: UPDATE_STYLE, payload: res.data });
    })
    .catch((err) =>
      dispatch(err.response.data)
    );
};

// Below code are not in use
// export const getStyleName = () => (dispatch) => {
//   axios
//     .get(`/style/style/`)
//     .then((res) => {
//       dispatch({ type: GET_STYLE_NAME, payload: res.data });
//     })
//     .catch((err) =>
//       dispatch(err.response.data)
//     );
// };
