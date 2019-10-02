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
            selectedModels: this.props.selected,
        }
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
        axios.get(prefixUrl + "/models/find-by-name?name=" + val)
            .then(res => {
                this.setState({
                    models: res.data.map(model => model.name)
                })
            })
            .catch(console.log);
    }

    handleSubmit = () => {
        axios({
            url: prefixUrl + "/movies/set-actresses/" + this.props.movieId,
            params: {
                models: this.state.selectedModels
            },
            method: "put"
        })
            .then(res => {
                this.props.changeMovieInfo("actresses", this.state.selectedModels);
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