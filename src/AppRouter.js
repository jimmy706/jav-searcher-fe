import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from './components/contents/Landing';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Landing} ></Route>
            </Switch>
        </BrowserRouter>
    )
}
