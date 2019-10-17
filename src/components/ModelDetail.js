import React, { Component, Suspense } from 'react';
import axios from "axios";
import prefixUrl from "../constant/prefix-url";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DynamicBlockContentLoader from "./content-loaders/DynamicBlockContentLoader";
import { Grid, Dialog } from "@material-ui/core";
import ModelDetailModalForm from './modals/ModelDetailModalForm';
import MovieSectionContentLoader from "./content-loaders/MovieSectionContentLoader";
const MovieInvolveSection = React.lazy(() => import('./contents/section/movies-involve-section/MovieInvolveSection'));


export default class ModelDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelInfo: {},
            openModal: false,
        }
    }

    componentDidMount() {
        const modelId = this.props.match.params.modelId;

        axios(`${prefixUrl}/models/model-info/${modelId}`)
            .then(res => {
                document.title = `Model info - ${res.data.name}`;
                this.setState({
                    modelInfo: res.data,
                })
            })
            .catch(console.log);
    }

    closeModal = () => {
        this.setState({
            openModal: false
        })
    }

    handleOpenModal = () => {
        this.setState({
            openModal: true
        })
    }

    handleChangeAvatar = (e) => {
        const modelId = this.props.match.params.modelId;
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);
        axios({
            url: prefixUrl + "/models/upload-avatar/" + modelId,
            method: 'put',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                this.setState((state) => {
                    return {
                        modelInfo: { ...state.modelInfo, avatar: res.data.avatar }
                    }
                })

            })
            .catch(err => {
                console.log(err.response);
            })
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
        const modelId = this.props.match.params.modelId;
        return (
            <Suspense fallback={<MovieSectionContentLoader />}>
                <MovieInvolveSection modelId={modelId} />
            </Suspense>
        )
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

    render() {
        const { openModal, modelInfo } = this.state;
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
                                    <button className="transparent-btn" onClick={this.handleOpenModal}> Edit</button>
                                </div>
                                <ul className="info-list">
                                    <li>
                                        <strong>Born: </strong>{this.renderModelDetail('born')}
                                    </li>
                                    <li>
                                        <strong>Breast: </strong>{this.renderModelDetail('breast')} cm
                                    </li>
                                    <li>
                                        <strong>Waist: </strong>{this.renderModelDetail('waist')} cm
                                    </li>
                                    <li>
                                        <strong>Hips: </strong>{this.renderModelDetail('hips')} cm
                                    </li>
                                    <li>
                                        <strong>Height: </strong>{this.renderModelDetail('height')} cm
                                    </li>
                                </ul>
                            </div>
                        </Grid>
                    </Grid>
                    <div className="wrap-block">
                        <div className="line-break">
                            <span className="section-title">Movie involve:</span>
                        </div>
                        {this.renderMoviesInvolve()}

                    </div>
                </div>
                <Dialog open={openModal} onClose={this.closeModal} scroll="paper">
                    <ModelDetailModalForm
                        closeModal={this.closeModal}
                        modelInfo={modelInfo}
                        handleChangeName={this.handleChangeName}
                        handleChangeModelDetail={this.handleChangeModelDetail}
                    />
                </Dialog>
            </div>
        )
    }
}
