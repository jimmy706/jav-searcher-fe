import React, { Component } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import prefixUrl from "../../../../constant/prefix-url";
import MovieAsync from "../movies-section/MovieAsync";


export default class MovieInvolveSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            movies: []
        }
    }

    componentDidMount() {
        const { modelId } = this.props;
        axios(`${prefixUrl}/movies/find-movies-contain-actress?modelId=${modelId}&page=${this.state.page}`)
            .then(res => {
                this.setState({
                    movies: res.data
                })
            })
            .catch(console.log)
    }

    fetchData = () => {
        this.setState((page) => {
            return {
                page: page + 1
            }
        }, () => {
            const { modelId } = this.props;
            const { page } = this.state;
            axios(`${prefixUrl}/movies/find-movies-contain-actress?modelId=${modelId}&page=${page}`)
                .then(res => {
                    this.setState({ movies: res.data })
                })
                .catch(console.log);

        })
    }

    render() {
        return (
            <InfiniteScroll dataLength={this.state.movies.length}
                next={this.fetchData}
                hasMore={true}
                className="movies-section"
            >
                {this.state.movies.map(movie => <MovieAsync key={movie.id} movieId={movie.movieId} />)}
            </InfiniteScroll>
        )
    }
}

