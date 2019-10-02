import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from "../constant/actionType";

export function openSnackbarAction(message, variant) {
    return {
        type: OPEN_SNACKBAR,
        message,
        variant
    }
}

export function closeSnackbarAction() {
    return {
        type: CLOSE_SNACKBAR
    }
}