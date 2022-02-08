import {
  ADD_STYLE,
  DELETE_STYLE,
  GET_STYLE,
  GET_STYLES,
  UPDATE_STYLE,
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

    case GET_STYLES:
      return {
        ...state,
        styles: action.payload,
      };

    case GET_STYLE:
      return {
        ...state,
        style: action.payload,
      };

    case ADD_STYLE:
      return {
        ...state,
        styles: [...state.styles, action.payload],
      };

    case DELETE_STYLE:
      return {
        ...state,
        styles: state.styles.filter((s) => s.id !== action.payload),
      };

    case UPDATE_STYLE:
      return {
        ...state,
        styles: state.styles.map((s) =>
          s.id === action.payload.id ? (s = action.payload) : s
        ),
      };

    case PATCH_STYLE:
      console.log(action.payload);
      return {
        ...state,
        // styles: state.styles.map((s) =>
        //   s.id === action.payload.id ? (s = action.payload) : s
        // ),
      };
    default:
      return state;
  }
}
