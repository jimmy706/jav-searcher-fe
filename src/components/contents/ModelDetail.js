import React, { Component, Suspense } from 'react';
import axios from "axios";
import prefixUrl from "../../constant/prefix-url";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DynamicBlockContentLoader from "../content-loaders/DynamicBlockContentLoader";
import { Grid, Dialog } from "@material-ui/core";
import ModelDetailModalForm from '../modals/ModelDetailModalForm';
import ModelUpdateMovieInVolveForm from '../modals/ModelUpdateMovieInvolveForm';
const MovieAsync = React.lazy(() => import("./section/movies-section/MovieAsync"));



export default class ModelDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelInfo: {},
            openModal: false,
            modalType: 'INFO'
        }
    }

    componentDidMount() {
        const modelId = this.props.match.params.modelId;
        axios(prefixUrl + "/models/model-info/" + modelId)
            .then(res => {
                this.setState({ modelInfo: res.data });
            })
            .catch(console.log);
    }

    closeModal = () => {
        this.setState({
            openModal: false
        })
    }

    handleOpenModal(type) {
        this.setState({
            modalType: type,
            openModal: true
        })
    }

    handleChangeAvatar = (e) => {

    }

    handleChangeName = (name) => {
        this.setState((state) => {
            state.modelInfo.name = name;
            return {
                modelInfo: { ...state.modelInfo }
            }
        })
    }

    handleChangeModelDetail = (modelDetail) => {
        this.setState({ modelInfo: { ...this.state.modelInfo, modelDetail: { ...modelDetail } } });
    }

    renderImage = () => {
        const { modelInfo } = this.state;
        if (modelInfo.avatar) {
            return (
                <div className="img-container">
                    <label htmlFor="movieImage" className="img-select"><img src={prefixUrl + modelInfo.avatar} className="movie-img" alt={modelInfo.name} /></label>
                    <input type="file" name="movieImage" id="movieImage" onChange={this.handleChangeAvatar} />
                </div>
            )
        }
        else {
            return <DynamicBlockContentLoader width={600} height={400} />;
        }
    }

    renderTitle = () => {
        const { modelInfo } = this.state;
        if (modelInfo.name) {
            return (
                <h3 className="title">
                    {modelInfo.name}
                </h3>
            )
        }
        else return null;
    }

    renderMoviesInvolve = () => {
        const { modelInfo } = this.state;
        if (modelInfo["moviesInvolve"]) {
            return modelInfo["moviesInvolve"].map(movieId => {
                return (
                    <Suspense key={movieId} fallback={<DynamicBlockContentLoader width={400} height={100} />}>
                        <MovieAsync movieId={movieId} />
                    </Suspense>
                )
            })
        }
        return null;
    }

    renderModelDetail = (type) => {
        const { modelDetail } = this.state.modelInfo;
        if (modelDetail) {
            if (type === 'born') {
                return new Date(modelDetail['born']).toLocaleDateString();
            }
            return modelDetail[type];
        }
        else return null;
    }

    updateMovieInvolve = (newMovieInvolveArr) => {
        this.setState((state) => {
            state.modelInfo.moviesInvolve = [...newMovieInvolveArr];
            return {
                modelInfo: { ...state.modelInfo }
            }
        }, () => {
            console.log(this.state);
        })
    }

    renderDialogContent = () => {
        const { modalType, modelInfo } = this.state;
        switch (modalType) {
            case 'INFO':
                return (
                    <ModelDetailModalForm
                        closeModal={this.closeModal}
                        modelInfo={modelInfo}
                        handleChangeName={this.handleChangeName}
                        handleChangeModelDetail={this.handleChangeModelDetail}
                    />
                );
            case 'MOVIES':
                return (
                    <ModelUpdateMovieInVolveForm closeModal={this.closeModal} selected={modelInfo.moviesInvolve}
                        modelId={modelInfo.id}
                        updateMovieInvolve={this.updateMovieInvolve} />
                )
            default:
                return (
                    <ModelDetailModalForm
                        closeModal={this.closeModal}
                        modelInfo={modelInfo}
                        handleChangeName={this.handleChangeName}
                        handleChangeModelDetail={this.handleChangeModelDetail}
                    />
                );
        }
    }

    render() {
        const { openModal } = this.state;
        return (
            <div className="section-detail model-detail-section">
                <button className="back-btn" title="Back to landing page" onClick={() => this.props.history.goBack()}>
                    <ArrowBackIcon />
                </button>
                <div className="detail-content">
                    <Grid container spacing={5}>
                        <Grid item xs={4}>
                            {this.renderImage()}
                        </Grid>
                        <Grid item xs={8}>
                            <div className="info">
                                {this.renderTitle()}
                                <div className="line-break">
                                    <span className="section-title">Model detail:</span>
                                    <button className="transparent-btn" onClick={() => this.handleOpenModal('INFO')}> Edit</button>
                                </div>
                                <ul className="info-list">
                                    <li>
                                        <strong>Born: </strong>{this.renderModelDetail('born')}
                                    </li>
                                    <li>
                                        <strong>Breast: </strong>{this.renderModelDetail('breast')}
                                    </li>
                                    <li>
                                        <strong>Waist: </strong>{this.renderModelDetail('waist')}
                                    </li>
                                    <li>
                                        <strong>Hips: </strong>{this.renderModelDetail('hips')}
                                    </li>
                                    <li>
                                        <strong>Height: </strong>{this.renderModelDetail('height')}
                                    </li>
                                </ul>
                            </div>
                        </Grid>
                    </Grid>
                    <div className="wrap-block">
                        <div className="line-break">
                            <span className="section-title">Movie involve:</span>
                            <button className="transparent-btn" onClick={() => this.handleOpenModal('MOVIES')}> Edit</button>
                        </div>
                        <ul className="movies-section">
                            {this.renderMoviesInvolve()}
                        </ul>
                    </div>
                </div>
                <Dialog open={openModal} onClose={this.closeModal} scroll="paper">
                    {this.renderDialogContent()}
                </Dialog>
            </div>
        )
    }
}
