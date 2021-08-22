import {
    GET_LAYERS,
    GET_STYLES,
} from "../actions/types";

const initialState = {
    layers: [],
    styles: []
};

export default function geoserver(state = initialState, action) {
    switch (action.type) {
        case GET_LAYERS:
            return {
                ...state,
                layers: action.payload
            };
        case GET_STYLES:
            return {
                ...state,
                styles: action.payload,
            };
        default:
            return state;
    }
}
