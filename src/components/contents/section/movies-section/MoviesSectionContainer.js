import React, { Component, Suspense } from 'react'
import prefixUrl from "../../../../constant/prefix-url";
import axios from "axios";
import MovieSectionContentLoader from "../../../content-loaders/MovieSectionContentLoader";
import SmallBlockContentLoader from "../../../content-loaders/SmallBlockContentLoader";
import { connect } from "react-redux";
const MovieAsync = React.lazy(() => import("./MovieAsync"))

class MoviesSectionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        }
    }

    checkArrayChanged(newArr, prevArr) {
        if (newArr.length !== prevArr.length) {
            return true;
        }
        for (let i = 0; i < prevArr.length; i++) {
            if (newArr[i] !== prevArr[i]) {
                return true;
            }
        }
        return false;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { page, movieFilter, numberOfMovies } = this.props;
        const { tags, models, studio, duration, sort } = nextProps.movieFilter;
        if (page !== nextProps.page ||
            (this.checkArrayChanged(nextProps.movieFilter.tags, movieFilter.tags) ||
                this.checkArrayChanged(nextProps.movieFilter.models.map(model => model.value), movieFilter.models.map(model => model.value)) ||
                movieFilter.duration !== nextProps.movieFilter.duration ||
                movieFilter.studio !== nextProps.movieFilter.studio ||
                movieFilter.sort !== nextProps.movieFilter.sort
            )) {
            axios.get(prefixUrl + "/movies/movies-list", {
                params: {
                    page: page,
                    tags: tags,
                    models: models.map(model => model.value),
                    studio: studio,
                    duration: duration,
                    sort: sort
                }
            })
                .then(movies => {
                    this.setState({
                        movies: movies.data.slice(0, numberOfMovies)
                    })
                })
                .catch(err => console.log(err.response.data));
        }
    }


    componentDidMount() {
        const { numberOfMovies, page, movieFilter } = this.props;
        const { tags, models, studio, duration, sort } = movieFilter;
        axios.get(prefixUrl + "/movies/movies-list", {
            params: {
                page: page,
                tags: tags,
                models: models.map(model => model.value),
                studio: studio,
                duration: duration,
                sort: sort
            }
        })
            .then(movieData => {
                this.setState({
                    movies: movieData.data.slice(0, numberOfMovies)
                })
            })
            .catch(err => console.log(err.response.data));
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

const mapStateToProps = (state) => {
    return {
        movieFilter: state.movieFilter
    }
}

export default connect(mapStateToProps, null)(MoviesSectionContainer);