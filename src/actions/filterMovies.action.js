import { UPDATE_SORT_FILTER, UPDATE_DURATION_FILTER, UPDATE_MODELS_FILTER, UPDATE_TAGS_FILTER, UPDATE_STUDIO_FILTER, RESET_FILTER } from "../constant/actionType";

export function updateSortFilterAct(sort) {
    return {
        type: UPDATE_SORT_FILTER,
        sort
    }
}

export function updateDurationFilterAct(duration) {
    return {
        type: UPDATE_DURATION_FILTER,
        duration
    }
}

export function updateStudioFilterAct(studio) {
    return {
        type: UPDATE_STUDIO_FILTER,
        studio
    }
}

export function updateModelsFilterAct(models) {
    return {
        type: UPDATE_MODELS_FILTER,
        models
    }
}

export function updateTagsFilterAct(tags) {
    return {
        type: UPDATE_TAGS_FILTER,
        tags
    }
}

export function resetFilterAct() {
    return {
        type: RESET_FILTER
    }
}