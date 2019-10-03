import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, Fab } from "@material-ui/core";
import axios from "axios";
import prefixUrl from "../../constant/prefix-url";
import MultiSelect from '../multi-select/MultiSelect';
import { connect } from "react-redux";
import { openSnackbarAction } from "../../actions/snackbar.action";


class MoviesUpdateActressForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            models: [],
            selectedModels: [], // FIXME: handle change selected list from model's id to model's name
        }
    }

    async componentDidMount() {
        let selectedNames = [];
        const { selected } = this.props;
        // eslint-disable-next-line 
        for (let modelId of selected) {
            let modelName = await axios(prefixUrl + "/models/get-model-name?modelId=" + modelId);
            selectedNames.push(modelName.data);
        }
        this.setState({
            selectedModels: selectedNames.map(model => {
                return {
                    title: model.name,
                    value: model.id
                }
            })
        })
    }

    selectModel = (selected) => {
        this.setState({
            selectedModels: selected,
        })
    }

    removeModel = (selected) => {
        this.setState({
            selectedModels: selected,
        })
    }

    onChangeInput = (val) => {
        if (val !== '') {
            axios.get(prefixUrl + "/models/find-by-name?name=" + val)
                .then(res => {
                    this.setState({
                        models: res.data.map(model => {
                            return {
                                title: model.name,
                                value: model.id
                            }
                        }),
                    })
                })
                .catch(console.log);
        }
    }

    handleSubmit = () => {
        const { selectedModels } = this.state;
        let modelNameToIds = selectedModels.map(model => model.value);
        axios({
            url: prefixUrl + "/movies/set-actresses/" + this.props.movieId,
            params: {
                models: modelNameToIds
            },
            method: "put"
        })
            .then(res => {
                this.props.changeMovieInfo("actresses", modelNameToIds);
                this.props.openSnackbar("Actresses updated", "success");
                this.props.closeModal();
            })
            .catch(err => this.props.openSnackbar(err.response.data.message, 'error'));
    }


    render() {
        const { models, selectedModels } = this.state;
        return (
            <div className="modal">
                <DialogTitle>Update acctress:</DialogTitle>
                <DialogContent>
                    {<MultiSelect suggestions={models}
                        placeholder="Type to search models"
                        onSelectItem={this.selectModel}
                        onRemoveItem={this.removeModel}
                        selected={selectedModels}
                        onChange={this.onChangeInput}
                    />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeModal} color="default">
                        Cancel
                     </Button>
                    <Fab variant="extended" color="primary" size="medium" onClick={this.handleSubmit}>
                        Save
                    </Fab>
                </DialogActions>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openSnackbar: (mess, variant) => dispatch(openSnackbarAction(mess, variant))
    }
}

export default connect(null, mapDispatchToProps)(MoviesUpdateActressForm);