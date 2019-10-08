import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import blue from '@material-ui/core/colors/blue';
import indigo from "@material-ui/core/colors/indigo";
import { Provider } from "react-redux";
import store from "./config/store";



const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: blue,
        secondary: indigo
    }
})

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>, document.getElementById('root'));
