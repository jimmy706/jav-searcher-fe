import React, { Component } from 'react';
import axios from "axios";
import prefixUrl from "../../../../constant/prefix-url";
import Model from './Model';


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
        return this.state.models.map(model => <Model model={model} key={model.id} />)
    }

    render() {
        return (
            <div className="models-section">
                {this.renderModels()}
            </div>
        )
    }
}
