import {
    CLIP_VECTOR,
    CLIP_RASTER,
    MERGE_VECTORS,
    BUFFER_VECTOR,
    VECTOR_TO_RASTER,
    RASTER_TO_VECTOR,
    VECTOR_TO_SHAPEFILE,
    SHAPEFILE_TO_GEOJSON,
} from '../actions/types';

const initialState = {
    clipvectors: '',
};

export default function dataPrep(state = initialState, action) {
    switch (action.type) {
        case CLIP_VECTOR:
            return {
                ...state,
                clipvectors: action.payload,
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
        case SHAPEFILE_TO_GEOJSON:
            return {
                ...state,
                message: 'Shapefile to geojson',
            };
        default:
            return state;
    }
}