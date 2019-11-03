import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from "../constant/actionType";

export function openSnackbarAction(message, variant, actionComp = null) {
    return {
        type: OPEN_SNACKBAR,
        message,
        variant,
        actionComp
    }
}

export function closeSnackbarAction() {
    return {
        type: CLOSE_SNACKBAR
    }
}