import React, { Component } from 'react';
import axios from "axios";
import prefixUrl from "../../../../constant/prefix-url";
import ModelAsync from './ModelAsync';
import ModelSectionContentLoader from "../../../content-loaders/ModelSectionContentLoader";


export default class ModelsSectionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            models: []
        }
    }

    componentDidMount() {
        const { numberOfModels, page } = this.props;
        axios.get(prefixUrl + "/models/models-list", {
            params: {
                page
            }
        })
            .then(res => {
                this.setState({
                    models: res.data.slice(0, numberOfModels)
                })
            })
            .catch(err => console.log(err));
    }

    renderModels = () => {
        if (this.state.models.length) {
            return (
                <div className="models-section">
                    {this.state.models.map(model => <ModelAsync modelName={model.name} key={model.id} />)}
                </div>
            )
        }
        else
            return <ModelSectionContentLoader />
    }

    render() {
        return (
            <>
                {this.renderModels()}
            </>
        )
    }
}
