import {
    GET_PROJECT,
    ADD_PROJECT,
    DELETE_PROJECT
  } from "../actions/types";
  
  const initialState = {
    project: []
  };
  
  export default function project(state = initialState, action) {
    switch (action.type) {
      case GET_PROJECT:
        return {
          ...state,
          project: action.payload,
        };
      case ADD_PROJECT:
        return {
          ...state,
          project: action.payload,
        };
      case DELETE_PROJECT:
        return {
          ...state,
          project: action.payload,
        };
      default:
        return state;
    }
  }
  