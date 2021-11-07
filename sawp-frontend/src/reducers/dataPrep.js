import {
    CLIP_VECTOR,
    CLIP_RASTER,
    MERGE_VECTORS,
    BUFFER_VECTOR,
    VECTOR_TO_RASTER,
    RASTER_TO_VECTOR,
    VECTOR_TO_SHAPEFILE,
} from '../actions/types';

const initialState = {
    message: '',
};

export default function dataPrep(state = initialState, action) {
    switch (action.type) {
        case CLIP_VECTOR:
            return {
                ...state,
                message: 'Clipping vector layer',
            };
        case CLIP_RASTER:
            return {
                ...state,
                message: 'Clipping raster layer',
            };
        case MERGE_VECTORS:
            return {
                ...state,
                message: 'Merging vector layers',
            };
        case BUFFER_VECTOR:
            return {
                ...state,
                message: 'Buffering vector layer',
            };
        case VECTOR_TO_RASTER:
            return {
                ...state,
                message: 'Vector to raster',
            };
        case RASTER_TO_VECTOR:
            return {
                ...state,
                message: 'Raster to vector',
            };
        case VECTOR_TO_SHAPEFILE:
            return {
                ...state,
                message: 'Vector to shapefile',
            };
        default:
            return state;
    }
}