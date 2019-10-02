import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from "../constant/actionType";

let defaultState = {
    openSnackbar: false,
    message: '',
    variant: 'success'
}

function SnackbarReducer(state = defaultState, action) {
    switch (action.type) {
        case OPEN_SNACKBAR:
            return { ...state, openSnackbar: true, message: action.message, variant: action.variant };
        case CLOSE_SNACKBAR:
            return { ...state, openSnackbar: false, message: '' };
        default:
            return { ...state };
    }
}

export default SnackbarReducer;