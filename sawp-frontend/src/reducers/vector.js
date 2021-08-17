import {
    GET_VECTOR,
    ADD_VECTOR,
    DELETE_VECTOR
  } from "../actions/types";
  
  const initialState = {
    vector: []
  };
  
  export default function vector(state = initialState, action) {
    switch (action.type) {
      case GET_VECTOR:
        return {
          ...state,
          vector: action.payload,
        };
      case ADD_VECTOR:
        return {
          ...state,
          vector: action.payload,
        };
      case DELETE_VECTOR:
        return {
          ...state,
          vector: action.payload,
        };
      default:
        return state;
    }
  }
  