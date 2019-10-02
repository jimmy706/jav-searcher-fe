import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, TextField, Checkbox, FormControlLabel, Fab } from "@material-ui/core";
import DragNDrop from "../dragndrop/DragNDrop";
import axios from "axios";
import prefixUrl from "../../constant/prefix-url";
import { connect } from "react-redux";
import { openSnackbarAction } from "../../actions/snackbar.action";



class ActressModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useUrl: true,
            avatar: null,
            name: '',
            url: ''
        }
    }

    handleAddModel = () => {
        const { name, url, avatar, useUrl } = this.state;
        const { openSnackbar } = this.props;
        if (useUrl) {
            axios({
                url: prefixUrl + "/models/add-model-with-url-avatar",
                params: {
                    name: name,
                    url: url
                },
                method: 'POST'
            })
                .then(res => {
                    openSnackbar("Create model successfully", "success");
                    this.props.handleClose();
                })
                .catch(err => openSnackbar(err.response.data.message, 'error'));
        }
        else {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("avatar", avatar);
            axios({
                url: prefixUrl + "/models/add-model",
                data: formData,
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    openSnackbar("Create model successfully", "success");
                    this.props.handleClose();
                })
                .catch(err => openSnackbar(err.response.data.message, 'error'));
        }
    }

    handleUploadFile = (avatar) => {
        this.setState({ avatar })
    }

    handleCheckBox = () => {
        this.setState(state => {
            return {
                useUrl: !state.useUrl
            }
        })
    }

    handleChangeValueInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        const { useUrl } = this.state;
        const { handleClose } = this.props;
        return (
            <div className="modal">
                <DialogTitle>
                    Add new model
                </DialogTitle>

                <DialogContent >
                    {
                        (useUrl) ? null : <DragNDrop handleUploadFile={this.handleUploadFile} />
                    }
                    <TextField
                        autoFocus
                        margin="normal"
                        id="modalName"
                        label="Model name"
                        type="text"
                        fullWidth
                        name="name"
                        autoComplete="off"
                        onChange={this.handleChangeValueInput}
                    />
                    <TextField
                        type="text"
                        id="url"
                        label="Model avatar URL"
                        fullWidth
                        name="url"
                        margin="normal"
                        autoComplete="off"
                        onChange={this.handleChangeValueInput}
                        style={{ display: useUrl ? "block" : "none" }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="jason" checked={useUrl} onClick={this.handleCheckBox} />}
                        label="Use URL image?"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cancel
                     </Button>
                    <Fab variant="extended" onClick={this.handleAddModel} color="primary" size="medium">
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

export default connect(null, mapDispatchToProps)(ActressModalForm);

