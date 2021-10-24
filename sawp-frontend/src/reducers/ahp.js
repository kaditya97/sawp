import {
    CALCULATE_AHP
  } from "../actions/types";
  
  const initialState = {
    ahp: null
  };
  
  export default function ahp(state = initialState, action) {
    switch (action.type) {
      case CALCULATE_AHP:
        return {
          ...state,
          ahp: action.payload,
        };
      default:
        return state;
    }
  }
  