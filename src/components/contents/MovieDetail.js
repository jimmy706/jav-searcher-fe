import React, { Component } from 'react';
import axiso from "axios";
import prefixUrl from "../../constant/prefix-url";

export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieDetail: {}
        }
    }

    componentDidMount() {
        const movieId = this.props.match.params.movieId;
        document.title = movieId;

        axiso.get(prefixUrl + "/movies/movie-info/" + movieId)
            .then(res => {
                this.setState({
                    movieDetail: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        return (
            <div>
                Movie detail
            </div>
        )
    }
}

