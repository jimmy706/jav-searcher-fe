import React, { Component } from 'react'
import Movie from './Movie';
import prefixUrl from "../../../../constant/prefix-url";
import axios from "axios";

export default class MoviesSectionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        const { numberOfMovies, page } = this.props;
        axios.get(prefixUrl + "/movies/movies-list?page=" + page)
            .then(movieData => {
                this.setState({
                    movies: movieData.data.slice(0, numberOfMovies).sort((m1, m2) => (m1.movieId > m2.movieId) ? 1 : -1)
                })
            })
            .catch(err => console.log(err));
    }

    renderMovieList = () => {
        return this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)
    }

    render() {
        return (
            <div className="movies-section">
                {this.renderMovieList()}
            </div>
        )
    }
}
