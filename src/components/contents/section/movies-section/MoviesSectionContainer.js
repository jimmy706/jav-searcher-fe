import React, { Component } from 'react'
import MovieAsync from './MovieAsync';
import prefixUrl from "../../../../constant/prefix-url";
import axios from "axios";
import MovieSectionContentLoader from "../../../content-loaders/MovieSectionContentLoader";

export default class MoviesSectionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        const { numberOfMovies, page } = this.props;
        axios.get(prefixUrl + "/movies/movies-list", {
            params: {
                page: page
            }
        })
            .then(movieData => {
                this.setState({
                    movies: movieData.data.slice(0, numberOfMovies).sort((m1, m2) => (m1.movieId > m2.movieId) ? 1 : -1)
                })
            })
            .catch(err => console.log(err));
    }

    renderMovieList = () => {
        if (this.state.movies.length) {
            return (
                <div className="movies-section">
                    {this.state.movies.map(movie => <MovieAsync key={movie.id} movieId={movie.movieId} />)}
                </div>
            )
        }
        else return <MovieSectionContentLoader />
    }

    render() {
        return (
            <>
                {this.renderMovieList()}
            </>
        )
    }
}
