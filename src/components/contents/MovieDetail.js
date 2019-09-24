import React, { Component, Suspense } from 'react';
import axios from "axios";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import prefixUrl from "../../constant/prefix-url";
import { Grid, Dialog } from "@material-ui/core";
import { Link } from "react-router-dom";
import MovieDetailModalForm from "../modals/MovieDetailModalForm";
import moment from "moment";
import TagsModalForm from '../modals/TagsModalForm';
import BlockContentLoader from "../content-loaders/SmallBlockContentLoader";
import MoviesUpdateActressForm from '../modals/MoviesUpdateActressForm';
const ModelAsync = React.lazy(() => import("./section/models-section/ModelAsync"));

export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieInfo: {},
            openModal: false,
            modalType: 'DETAIL'
        }
    }

    closeModal = () => {
        this.setState({ openModal: false });
    }

    handleOpenModal = (type) => {
        this.setState({ openModal: true, modalType: type });
    }

    componentDidMount() {
        const movieId = this.props.match.params.movieId;
        document.title = movieId;

        axios.get(prefixUrl + "/movies/movie-info/" + movieId)
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
            return <img src={prefixUrl + movieInfo.movieImage} className="movie-img" alt={movieInfo.movieId} />
        }
        else {
            return null;
        }
    }

    renderDetailList = (type) => {
        const { movieDetail } = this.state.movieInfo;
        if (movieDetail) {
            switch (type) {
                case "releaseDate":
                    return moment(movieDetail["releaseDate"]).format("MM/DD/YYYY");
                default:
                    return movieDetail[type];
            }
        }
        else {
            return null;
        }
    }

    renderTitle = () => {
        const { movieDetail } = this.state.movieInfo;
        if (movieDetail) {
            return (
                <h3 className="movie-title">
                    <a href={movieDetail.link} target="_blank" rel="noopener noreferrer">{movieDetail.movieName}</a>
                </h3>
            );
        }
        else {
            return <h3 className="movie-title">{this.state.movieInfo.movieId}</h3>
        }
    }

    renderModalContent = () => {
        const { modalType, movieInfo } = this.state;
        const { movieDetail, tags, actresses } = movieInfo;
        switch (modalType) {
            case "TAGS":
                return <TagsModalForm closeModal={this.closeModal} movieId={movieInfo.movieId} selected={tags} changeMovieInfo={this.changeMovieInfo} />;
            case "MODELS":
                return <MoviesUpdateActressForm closeModal={this.closeModal} movieId={movieInfo.movieId} selected={actresses} changeMovieInfo={this.changeMovieInfo} />
            default:
                return <MovieDetailModalForm movieDetail={movieDetail ? movieDetail : {}}
                    closeModal={this.closeModal}
                    changeMovieInfo={this.changeMovieInfo}
                    movieId={movieInfo.movieId}
                />
        }
    }

    renderTags = () => {
        const { movieInfo } = this.state;
        if (movieInfo["tags"])
            return movieInfo["tags"].map(tag => {
                return <li className="tag-item" key={tag}><Link to={"/tags/" + tag}>{tag}</Link></li>
            })
        else
            return null;
    }

    renderModels = () => {
        const { movieInfo } = this.state;
        if (movieInfo["actresses"]) {
            return movieInfo["actresses"].map(modelName => {
                return (
                    <Suspense key={modelName} fallback={<BlockContentLoader />}>
                        <ModelAsync modelName={modelName} />
                    </Suspense>
                )
            });
        }
        return null;
    }

    changeMovieInfo = (type, data) => {
        this.setState((state) => {
            state.movieInfo[type] = data;
            return {
                movieInfo: state.movieInfo
            }
        })
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
                                {this.renderTitle()}
                                <div className="line-break">
                                    <span className="section-title">Movie detail:</span>
                                    <button className="transparent-btn" onClick={() => handleOpenModal("")}> Edit</button>
                                </div>
                                <ul className="info-list">
                                    <li>
                                        <strong>Release date: </strong>
                                        <span>{renderDetailList("releaseDate")}</span>
                                    </li>
                                    <li>
                                        <strong>Studio: </strong>
                                        {movieDetail ? <Link to={movieDetail["studio"] ? ("/studios/" + movieDetail["studio"]) : "/"}>{renderDetailList("studio")}</Link> : null}
                                    </li>
                                    <li>
                                        <strong>Length: </strong>
                                        <span>{renderDetailList("length")} min</span>
                                    </li>
                                    <li>
                                        <strong>Description:</strong>
                                        <p className="movie-desc" style={{ marginTop: 0 }}>{renderDetailList("content")}</p>
                                    </li>
                                </ul>
                            </div>
                        </Grid>
                    </Grid>


                    <div className="wrap-block">
                        <div className="line-break">
                            <span className="section-title">Tags:</span>
                            <button className="transparent-btn" onClick={() => handleOpenModal("TAGS")}> Edit</button>
                        </div>
                        <ul className="tag-list">
                            {this.renderTags()}
                        </ul>
                    </div>

                    <div className="wrap-block">
                        <div className="line-break">
                            <span className="section-title">Models:</span>
                            <button className="transparent-btn" onClick={() => handleOpenModal("MODELS")}> Edit</button>
                        </div>
                        <ul className="actress-list models-section">
                            {this.renderModels()}
                        </ul>
                    </div>
                </div>
                <Dialog open={openModal} onClose={closeModal}>
                    {this.renderModalContent()}
                </Dialog>
            </div>
        )
    }
}

