import { combineReducers } from "redux";
import SnackbarReducer from "./snackbar.reducer";
import MovieFilterReducer from "./movie-filter.reducer";

const rootReducer = combineReducers({
    snackbarState: SnackbarReducer,
    movieFilter: MovieFilterReducer
});

export default rootReducer;