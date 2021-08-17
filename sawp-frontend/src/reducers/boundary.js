import {
    GET_BOUNDARY,
    ADD_BOUNDARY
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
      default:
        return state;
    }
  }
  