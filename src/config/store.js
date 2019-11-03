import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/root.reducer";
import thunk from "redux-thunk";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        // TODO: disable redux devtools when deploy to master
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;