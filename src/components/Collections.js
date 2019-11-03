import React, { Component, Suspense } from 'react';
import axios from "axios";
import prefixUrl from "../constant/prefix-url";
import SmallBlockContentLoader from './content-loaders/SmallBlockContentLoader';
import PageHeader from './contents/headers/PageHeader';
import { Grid } from "@material-ui/core";
import Pagination from "./pagination/Pagination";
const MovieAsync = React.lazy(() => import("./contents/section/movies-section/MovieAsync"));

export default class Collections extends Component {
    constructor(props) {
        super(props);
        this.collectionName = this.props.match.params.collectionName;
        this.size = 20;
        this.state = {
            movies: [],
            currentPage: 1
        }
    }

    async componentDidMount() {
        const requests = [axios(`${prefixUrl}/collections/get-movies/${this.collectionName}?page=${this.state.currentPage}`),
        axios(`${prefixUrl}/collections/get-collection-size/${this.collectionName}`)];
        const result = await Promise.all(requests);
        this.setState({
            movies: result[0].data
        })
        this.size = result[1].data;
    }

    renderMovies = () => {
        return this.state.movies.map(movieId => (
            <Grid key={movieId} item xs={3}>
                <Suspense fallback={<SmallBlockContentLoader />} >
                    <MovieAsync movieId={movieId} />
                </Suspense>
            </Grid>

        ))
    }

    handleChangePage = (page) => {
        axios(`${prefixUrl}/collections/get-movies/${this.collectionName}?page=${page}`)
            .then(movies => {
                this.setState({
                    movies: movies.data,
                    currentPage: page
                })
            })
            .catch(console.log);
    }

    render() {
        const { currentPage } = this.state;
        return (
            <div>
                <PageHeader title={this.collectionName} history={this.props.history} ></PageHeader>
                <br />
                <Grid container spacing={4}>
                    {this.renderMovies()}
                </Grid>
                <Pagination size={this.size} currentPage={currentPage} onChangePage={this.handleChangePage} />
            </div>
        )
    }
}

