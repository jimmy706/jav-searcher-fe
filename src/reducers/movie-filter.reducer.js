import { UPDATE_SORT_FILTER, UPDATE_STUDIO_FILTER, UPDATE_DURATION_FILTER, UPDATE_TAGS_FILTER, UPDATE_MODELS_FILTER, RESET_FILTER } from "../constant/actionType";

const defaultState = {
    sort: 1,
    duration: 0,
    tags: [],
    models: [],
    studio: ''
}

function MovieFilterReducer(state = defaultState, action) {
    switch (action.type) {
        case UPDATE_DURATION_FILTER:
            return { ...state, duration: action.duration };
        case UPDATE_SORT_FILTER:
            return { ...state, sort: action.sort };
        case UPDATE_STUDIO_FILTER:
            return { ...state, studio: action.studio };
        case UPDATE_TAGS_FILTER:
            return { ...state, tags: [...action.tags] };
        case UPDATE_MODELS_FILTER:
            return { ...state, models: [...action.models] }
        case RESET_FILTER:
            return { ...defaultState }
        default:
            return { ...state };
    }
}

export default MovieFilterReducer;