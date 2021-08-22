import {
    GET_SUITABILITY,
    ADD_SUITABILITY,
    UPDATE_SUITABILITY,
    DELETE_SUITABILITY,
  } from "../actions/types";
  
  const initialState = {
    suitability: []
  };
  
  export default function suitability(state = initialState, action) {
    switch (action.type) {
      case GET_SUITABILITY:
        return {
          ...state,
          suitability: action.payload,
        };
      case ADD_SUITABILITY:
        return {
          ...state,
          suitability: action.payload,
        };
      case UPDATE_SUITABILITY:
        return {
          ...state,
          suitability: action.payload,
        };
      case DELETE_SUITABILITY:
        return {
          ...state,
          suitability: action.payload,
        };
      default:
        return state;
    }
  }
  