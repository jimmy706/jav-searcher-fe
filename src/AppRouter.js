import React from 'react';
import { Route, Switch } from "react-router-dom";
import Landing from './components/Landing';
import MovieDetail from "./components/MovieDetail";
import Tags from './components/Tags';
import ModelDetail from './components/ModelDetail';

export default function AppRouter() {
    return (
        <Switch>
            <Route path="/" component={Landing} exact ></Route>
            <Route path="/movies/detail/:movieId" exact component={MovieDetail} />
            <Route path="/tags/all" component={Tags} />
            <Route path="/models/detail/:modelId" component={ModelDetail} />
        </Switch>
    )
}
