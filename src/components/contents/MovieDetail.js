import React, { Component } from 'react';
import axiso from "axios";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import prefixUrl from "../../constant/prefix-url";
import { Grid, Dialog } from "@material-ui/core";
import { Link } from "react-router-dom";
import MovieDetailModalForm from "../modals/MovieDetailModalForm";

let tagDatas = null;

export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieInfo: {},
            openModal: false,
            openModalList: false,
            typeModelList: 'tags'
        }
    }

    closeModal = () => {
        this.setState({ openModal: false });
    }

    handleOpenModal = () => {
        this.setState({ openModal: true });
    }

    componentDidMount() {
        const movieId = this.props.match.params.movieId;
        document.title = movieId;

        axiso.get(prefixUrl + "/tags/all-tags")
            .then(res => {
                tagDatas = res.data;
            })
            .catch(err => {
                console.log(err);
            })

        axiso.get(prefixUrl + "/movies/movie-info/" + movieId)
            .then(res => {
                this.setState({
                    movieInfo: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    renderImage = () => {
        const { movieInfo } = this.state;
        if (movieInfo.movieImage) {
            return <img src={"data:image/png;base64," + movieInfo.movieImage.data} className="movie-img" alt={movieInfo.movieId} />
        }
        else {
            return null;
        }
    }

    renderDetailList = (type) => {
        const { movieDetail } = this.state;
        if (movieDetail) {
            console.log(movieDetail[type]);
            return null;
        }
        else {
            return null;
        }
    }

    render() {
        const { movieInfo, openModal } = this.state;
        const { movieDetail } = movieInfo;
        const { renderDetailList, closeModal, handleOpenModal } = this;
        return (
            <div className="section-detail movie-detail-section">
                <Link to="/" className="back-btn" title="Back to landing page">
                    <ArrowBackIcon />
                </Link>
                <div className="detail-content">
                    <Grid container spacing={5}>
                        <Grid item xs={6}>
                            <div className="img-container">
                                {this.renderImage()}
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="movie-info">
                                <h3 className="movie-title">{movieDetail ? movieDetail.movieName : movieInfo.movieId}</h3>
                                <div className="line-break">
                                    <span className="section-title">Movie detail:</span>
                                    <button className="transparent-btn" onClick={handleOpenModal}> Edit</button>
                                </div>
                                <ul className="info-list">
                                    <li>
                                        <strong>Release date: {renderDetailList()}</strong>
                                    </li>
                                    <li>
                                        <strong>Studio: {renderDetailList()}</strong>
                                    </li>
                                    <li>
                                        <strong>Length: {renderDetailList()}</strong>
                                    </li>
                                    <li>
                                        <strong>Description:</strong>
                                        <p className="movie-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    </li>
                                </ul>
                            </div>
                        </Grid>
                    </Grid>


                    <div className="wrap-block">
                        <div className="line-break">
                            <span className="section-title">Tags:</span>
                            <button className="transparent-btn" onClick={handleOpenModal}> Edit</button>
                        </div>
                    </div>

                    <div className="wrap-block">
                        <div className="line-break">
                            <span className="section-title">Actresses:</span>
                            <button className="transparent-btn" onClick={handleOpenModal}> Edit</button>
                        </div>
                    </div>


                </div>
                <Dialog open={openModal} scroll={'paper'} onClose={closeModal}>
                    <MovieDetailModalForm movieDetail={movieDetail} closeModal={closeModal} movieId={movieInfo.movieId} />
                </Dialog>
            </div>
        )
    }
}

