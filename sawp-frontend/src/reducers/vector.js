import {
  VECTOR_LOADING,
  GET_VECTOR,
  ADD_VECTOR,
  UPDATE_VECTOR,
  DELETE_VECTOR
} from "../actions/types";

const initialState = {
  vector: [],
  loading: true
};

export default function vector(state = initialState, action) {
  switch (action.type) {
    case VECTOR_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_VECTOR:
      return {
        ...state,
        vector: action.payload,
        loading: false
      };
    case ADD_VECTOR:
      return {
        ...state,
        vector: action.payload,
        loading: false
      };
    case UPDATE_VECTOR:
      return {
        ...state,
        vector: action.payload,
        loading: false
      };
    case DELETE_VECTOR:
      return {
        ...state,
        vector: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
