import React from 'react';
import { Route, Switch } from "react-router-dom";
import Landing from '../components/Landing';
import MovieDetail from "../components/MovieDetail";
import Tags from '../components/Tags';
import ModelDetail from '../components/ModelDetail';
import Studios from "../components/Studios";
import Movies from '../components/Movies';

export default function AppRouter() {
    return (
        <Switch>
            <Route path="/" component={Landing} exact ></Route>
            <Route path="/movies/detail/:movieId" exact component={MovieDetail} />
            <Route path="/tags/all" component={Tags} />
            <Route path="/models/detail/:modelId" component={ModelDetail} />
            <Route path="/studios/all" exact component={Studios} />
            <Route path="/movies/all" component={Movies} />
        </Switch>
    )
}
