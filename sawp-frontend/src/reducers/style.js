import {
  GET_STYLE,
  PATCH_STYLE,
  GET_SLD,
} from "../actions/types";

const initialState = {
  styles: [],
  style: {},
  sld: "",
};

export default function style(state = initialState, action) {
  switch (action.type) {
    case GET_SLD:
      return {
        ...state,
        sld: action.payload,
      };

    case GET_STYLE:
      return {
        ...state,
        style: action.payload,
      };

    case PATCH_STYLE:
      return {
        ...state,
        style: action.payload,
      };
    default:
      return state;
  }
}
