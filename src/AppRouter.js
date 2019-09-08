import React from 'react';
import { Route, Switch } from "react-router-dom";
import Landing from './components/contents/Landing';
import MovieDetail from "./components/contents/MovieDetail";
import Tags from './components/contents/Tags';

export default function AppRouter() {
    return (
        <Switch>
            <Route path="/" component={Landing} exact ></Route>
            <Route path="/movies/detail/:movieId" exact component={MovieDetail} />
            <Route path="/tags/all" component={Tags} />
        </Switch>
    )
}
