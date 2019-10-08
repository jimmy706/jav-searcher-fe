import React, { Component } from 'react';
import { Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import prefixUrl from "../constant/prefix-url";
import { Link } from "react-router-dom";
import PageHeader from './contents/headers/PageHeader';


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
        return studios.map(studio => <Link key={studio.id} to={"/movies/all?studio=" + studio.studioName} className="studio">{studio.studioName}</Link>);
    }



    render() {
        return (
            <div>
                <PageHeader title="Studios" history={this.props.history}>
                    <Fab color="primary" size="small" title="Add new studio" >
                        <AddIcon />
                    </Fab>
                </PageHeader>
                <div className="studio-content section-container">
                    {this.renderStudios()}
                </div>
            </div>
        )
    }
}
