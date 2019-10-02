import { combineReducers } from "redux";
import SnackbarReducer from "./snackbar.reducer";

const rootReducer = combineReducers({
    snackbarState: SnackbarReducer
});

export default rootReducer;