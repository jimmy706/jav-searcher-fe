import React from 'react';
import { Route, Switch } from "react-router-dom";
import Landing from './components/contents/Landing';

export default function AppRouter() {
    return (
        <Switch>
            <Route path="/" component={Landing} ></Route>
        </Switch>
    )
}
