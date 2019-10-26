import React, { Component, Suspense } from 'react';
import axios from "axios";
import prefixUrl from "../constant/prefix-url";
import { Grid, Dialog, Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import MovieDetailModalForm from "./modals/MovieDetailModalForm";
import moment from "moment";
import TagsModalForm from './modals/TagsModalForm';
import BlockContentLoader from "./content-loaders/SmallBlockContentLoader";
import MoviesUpdateActressForm from './modals/MoviesUpdateActressForm';
import AllowDoActionModal from "./modals/AllowDoActionModal";
import DynamicBlockContentLoader from "./content-loaders/DynamicBlockContentLoader";
import PageHeader from './contents/headers/PageHeader';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from "react-redux";
import { openSnackbarAction } from "../actions/snackbar.action";
import BookmarksIcon from '@material-ui/icons/Bookmarks';

const ModelAsync = React.lazy(() => import("./contents/section/models-section/ModelAsync"));

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieInfo: {},
            openModal: false,
            modalType: 'DETAIL',
            star: null
        }
    }

    closeModal = () => this.setState({ openModal: false });


    handleOpenModal = (type) => this.setState({ openModal: true, modalType: type });

    async componentDidMount() {
        const movieId = this.props.match.params.movieId;
        document.title = `Movie info - ${movieId}`;
        const requests = [axios(`${prefixUrl}/movies/movie-info/${movieId}`), axios(`${prefixUrl}/stars/get-star?itemId=${movieId}&type=MOVIE`)];

        const result = await Promise.all(requests);
        this.setState({
            movieInfo: result[0].data,
            star: result[1].data
        })
    }

    handleChangeMovieImage = (e) => {
        const formData = new FormData();
        formData.append("movieImage", e.target.files[0]);
        axios({
            url: prefixUrl + "/movies/upload-movie-image/" + this.state.movieInfo.movieId,
            data: formData,
            method: "put",
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                this.setState((state) => {
                    state.movieInfo["movieImage"] = res.data.movieImage;
                    return {
                        movieInfo: state.movieInfo
                    }
                })
            })
            .catch(console.log);
    }

    renderImage = () => {
        const { movieInfo } = this.state;
        if (movieInfo.movieImage) {
            return (
                <div className="img-container">
                    <label htmlFor="movieImage" className="img-select"><img src={movieInfo.movieImage} className="movie-img" alt={movieInfo.movieId} /></label>
                    <input type="file" name="movieImage" id="movieImage" onChange={this.handleChangeMovieImage} />
                </div>
            )
        }
        else {
            return <DynamicBlockContentLoader width={600} height={400} />;
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
                <h3 className="title">
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
            case "CONFIRM":
                return <AllowDoActionModal
                    title="Do you really want to delete this movie?"
                    content="After delete this, you can't undo your action"
                    closeModal={this.closeModal}
                    onConfirm={this.deleteMovie} />
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
            return movieInfo["actresses"].map(modelId => {
                return (
                    <Suspense key={modelId} fallback={<BlockContentLoader />}>
                        <ModelAsync modelId={modelId} />
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

    deleteMovie = (isAllow) => {
        const { movieInfo } = this.state;
        if (isAllow) {
            axios({
                url: `${prefixUrl}/movies/delete-movie/${movieInfo.id}`,
                method: 'delete'
            })
                .then(res => {
                    this.props.openSnackbar(`Movie ${movieInfo.movieId} deleted`, "success");
                    this.props.history.push("/movies/all");
                })
                .catch(console.log);
        }
    }

    handleAddStar = () => {
        const { movieId } = this.state.movieInfo;
        const { star } = this.state;
        if (!star) {
            axios({
                method: 'post',
                params: {
                    itemId: movieId,
                    type: 'MOVIE'
                },
                url: `${prefixUrl}/stars/add`
            })
                .then(star => {
                    this.setState({ star: star.data })
                })
                .catch(err => console.log(err.response))
        }
        else {
            axios.delete(`${prefixUrl}/stars/remove/${star.id}`)
                .then(res => {
                    this.setState({ star: null })
                })
                .catch(console.log)
        }
    }

    render() {
        const { movieInfo, openModal, star } = this.state;
        const { movieDetail } = movieInfo;
        const { renderDetailList, closeModal, handleOpenModal } = this;
        return (
            <div className="section-detail movie-detail-section">
                <PageHeader history={this.props.history}>
                    <Fab size="small"
                        title={star ? "Remove mark" : "Add to favorite"}
                        style={{ marginRight: "15px" }}
                        onClick={this.handleAddStar}>
                        <BookmarksIcon style={{ fill: star ? "#142C6B" : "" }} />
                    </Fab>
                    <Fab size="small"
                        onClick={() => handleOpenModal("CONFIRM")}
                        style={{ background: "#B71C1C" }} title="Delete movie">
                        <DeleteIcon style={{ fill: "#fcf2f2" }} />
                    </Fab>
                </PageHeader>
                <div className="detail-content">
                    <Grid container spacing={5}>
                        <Grid item xs={6}>
                            {this.renderImage()}
                        </Grid>
                        <Grid item xs={6}>
                            <div className="info">
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
                                        <strong>Duration: </strong>
                                        <span>{renderDetailList("length")} mins</span>
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

const mapDispatchToProps = (dispatch) => {
    return {
        openSnackbar: (message, variant) => dispatch(openSnackbarAction(message, variant))
    }
}

export default connect(null, mapDispatchToProps)(MovieDetail);