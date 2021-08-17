import {
    GET_RASTER,
    ADD_RASTER
  } from "../actions/types";
  
  const initialState = {
    raster: []
  };
  
  export default function raster(state = initialState, action) {
    switch (action.type) {
      case GET_RASTER:
        return {
          ...state,
          raster: action.payload,
        };
      case ADD_RASTER:
        return {
          ...state,
          raster: action.payload,
        };
      default:
        return state;
    }
  }
  