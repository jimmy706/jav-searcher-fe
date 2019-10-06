import React, { Component } from 'react';
import { Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from "axios";
import prefixUrl from "../constant/prefix-url";
import { Link } from "react-router-dom";


export default class Studios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studios: []
        }
    }

    componentDidMount() {
        axios.get(prefixUrl + "/studios/all")
            .then(res => {
                this.setState({ studios: res.data })
            })
            .catch(console.log);
    }

    renderStudios = () => {
        const { studios } = this.state;
        return studios.map(studio => <Link key={studio.id} to={"/studios/get-movies?studio=" + studio.studioName} className="studio">{studio.studioName}</Link>);
    }



    render() {
        return (
            <div>
                <div className="page-header">
                    <button className="back-btn" title="Back to landing page" onClick={() => this.props.history.goBack()}>
                        <ArrowBackIcon />
                    </button>
                    <span className="page-title">Studios:</span>
                    <div className="interact-area">
                        <Fab color="primary" size="small" title="Add new studio" >
                            <AddIcon />
                        </Fab>
                    </div>
                </div>
                <div className="studio-content section-container">
                    {this.renderStudios()}
                </div>
            </div>
        )
    }
}
