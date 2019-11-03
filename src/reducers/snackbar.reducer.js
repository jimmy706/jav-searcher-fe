import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from "../constant/actionType";

let defaultState = {
    openSnackbar: false,
    message: '',
    variant: 'success',
    action: null
}

function SnackbarReducer(state = defaultState, action) {
    switch (action.type) {
        case OPEN_SNACKBAR:
            return { ...state, openSnackbar: true, message: action.message, variant: action.variant, action: action.actionComp ? { ...action.actionComp } : null };
        case CLOSE_SNACKBAR:
            return { ...state, openSnackbar: false, message: '' };
        default:
            return { ...state };
    }
}

export default SnackbarReducer;