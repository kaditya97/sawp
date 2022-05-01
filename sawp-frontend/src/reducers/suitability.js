import {
  SUITABILITY_LOADING,
  GET_SUITABILITY,
  ADD_SUITABILITY,
  UPDATE_SUITABILITY,
  DELETE_SUITABILITY,
} from "../actions/types";

const initialState = {
  suitability: null,
  loading: true
};

export default function suitability(state = initialState, action) {
  switch (action.type) {
    case SUITABILITY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SUITABILITY:
      return {
        ...state,
        suitability: action.payload,
        loading: false
      };
    case ADD_SUITABILITY:
      return {
        ...state,
        suitability: action.payload,
        loading: false
      };
    case UPDATE_SUITABILITY:
      return {
        ...state,
        suitability: action.payload,
        loading: false
      };
    case DELETE_SUITABILITY:
      return {
        ...state,
        suitability: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
