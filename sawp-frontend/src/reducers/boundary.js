import {
    GET_BOUNDARY,
    ADD_BOUNDARY,
    UPDATE_BOUNDARY,
    DELETE_BOUNDARY,
  } from "../actions/types";
  
  const initialState = {
    boundary: []
  };
  
  export default function boundary(state = initialState, action) {
    switch (action.type) {
      case GET_BOUNDARY:
        return {
          ...state,
          boundary: action.payload,
        };
      case ADD_BOUNDARY:
        return {
          ...state,
          boundary: action.payload,
        };
      case UPDATE_BOUNDARY:
        return {
          ...state,
          boundary: action.payload,
        };
      case DELETE_BOUNDARY:
        return {
          ...state,
          boundary: action.payload,
        };
      default:
        return state;
    }
  }
  