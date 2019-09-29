import React, { Component } from 'react';
import axios from "axios";
import prefixUrl from "../../constant/prefix-url";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DynamicBlockContentLoader from "../content-loaders/DynamicBlockContentLoader";
import { Grid, Dialog } from "@material-ui/core";
import ModelDetailModalForm from '../modals/ModelDetailModalForm';



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
                console.log(res.data);
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

    handleChangeMovieImage = (e) => {

    }

    renderImage = () => {
        const { modelInfo } = this.state;
        if (modelInfo.avatar) {
            return (
                <div className="img-container">
                    <label htmlFor="movieImage" className="img-select"><img src={prefixUrl + modelInfo.avatar} className="movie-img" alt={modelInfo.name} /></label>
                    <input type="file" name="movieImage" id="movieImage" onChange={this.handleChangeMovieImage} />
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
                                        <strong>Born: </strong>
                                    </li>
                                    <li>
                                        <strong>Bearst: </strong>
                                    </li>
                                    <li>
                                        <strong>Waist: </strong>
                                    </li>
                                    <li>
                                        <strong>Hips: </strong>
                                    </li>
                                    <li>
                                        <strong>Height:</strong>
                                    </li>
                                </ul>
                            </div>
                        </Grid>
                    </Grid>
                    <div className="wrap-block">
                        <div className="line-break">
                            <span className="section-title">Movie involve:</span>
                            <button className="transparent-btn"> Edit</button>
                        </div>
                        <ul className="movies-section">

                        </ul>
                    </div>
                </div>
                <Dialog open={openModal} onClose={this.closeModal} scroll="paper">
                    <ModelDetailModalForm closeModal={this.closeModal} />
                </Dialog>
            </div>
        )
    }
}
