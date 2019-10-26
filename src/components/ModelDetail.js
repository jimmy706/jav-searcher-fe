import React, { Component, Suspense } from 'react';
import axios from "axios";
import prefixUrl from "../constant/prefix-url";
import AllowDoActionModal from "./modals/AllowDoActionModal";
import DynamicBlockContentLoader from "./content-loaders/DynamicBlockContentLoader";
import { Grid, Dialog, Fab } from "@material-ui/core";
import ModelDetailModalForm from './modals/ModelDetailModalForm';
import MovieSectionContentLoader from "./content-loaders/MovieSectionContentLoader";
import PageHeader from './contents/headers/PageHeader';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from "react-redux";
import { openSnackbarAction } from "../actions/snackbar.action";

const MovieInvolveSection = React.lazy(() => import('./contents/section/movies-involve-section/MovieInvolveSection'));


class ModelDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelInfo: {},
            openModal: false,
            modalType: ''
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

    handleOpenModal = (type) => {
        this.setState({
            openModal: true,
            modalType: type
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
                    <label htmlFor="movieImage" className="img-select"><img src={modelInfo.avatar} className="movie-img" alt={modelInfo.name} /></label>
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

    deleteModel = (isAllow) => {
        const { modelInfo } = this.state;
        if (isAllow) {
            axios({
                url: `${prefixUrl}/models/delete-model/${modelInfo.id}`,
                method: 'delete'
            })
                .then(res => {
                    this.props.openSnackbar(`Model ${modelInfo.name} has been deleted`, 'success');
                    this.props.history.push("/");
                })
        }
    }

    renderModal = () => {
        const { modalType, modelInfo } = this.state;
        switch (modalType) {
            case 'CONFIRM':
                return <AllowDoActionModal
                    title="Do you really want to delete this model?"
                    content="After delete this, you can't undo your action, all relate movies will updated"
                    closeModal={this.closeModal}
                    onConfirm={this.deleteModel} />
            default:
                return <ModelDetailModalForm
                    closeModal={this.closeModal}
                    modelInfo={modelInfo}
                    handleChangeName={this.handleChangeName}
                    handleChangeModelDetail={this.handleChangeModelDetail}
                />
        }
    }

    render() {
        const { openModal } = this.state;
        return (
            <div className="section-detail model-detail-section">
                <PageHeader history={this.props.history}>
                    <Fab size="small"
                        onClick={() => this.handleOpenModal('CONFIRM')}
                        style={{ background: "#B71C1C" }} title="Delete model">
                        <DeleteIcon style={{ fill: "#fcf2f2" }} />
                    </Fab>
                </PageHeader>
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
                                    <button className="transparent-btn" onClick={() => this.handleOpenModal('')}> Edit</button>
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
                    {this.renderModal()}
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

export default connect(null, mapDispatchToProps)(ModelDetail);