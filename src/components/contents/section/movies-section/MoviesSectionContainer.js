import React, { Component, Suspense } from 'react'
import prefixUrl from "../../../../constant/prefix-url";
import axios from "axios";
import MovieSectionContentLoader from "../../../content-loaders/MovieSectionContentLoader";
import SmallBlockContentLoader from "../../../content-loaders/SmallBlockContentLoader"
const MovieAsync = React.lazy(() => import("./MovieAsync"))

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
                    {this.state.movies.map(movie => {
                        return (
                            <Suspense fallback={<SmallBlockContentLoader />} key={movie.id}>
                                <MovieAsync movieId={movie.movieId} />
                            </Suspense>
                        )
                    })}
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
