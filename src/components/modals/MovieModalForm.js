import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, TextField, Checkbox, FormControlLabel } from "@material-ui/core";
import axios from "axios";

export default class MovieModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useUrl: true
        }
    }

    handleAddMovie = () => {

    }

    handleCheckBox = () => {
        this.setState(state => {
            return {
                useUrl: !state.useUrl
            }
        })
    }

    render() {
        const { handleClose } = this.props;
        const { useUrl } = this.state;
        return (
            <div className="modal">
                <DialogTitle>
                    Add new movie
                </DialogTitle>

                <DialogContent >
                    <TextField
                        autoFocus
                        margin="normal"
                        id="movieId"
                        label="Movie ID"
                        type="text"
                        fullWidth
                        name="movieId"
                        autoComplete="off"
                    />
                    <TextField
                        type="text"
                        id="url"
                        label="Movie image URL"
                        fullWidth
                        name="url"
                        margin="normal"
                        autoComplete="off"
                        style={{ display: useUrl ? "block" : "none" }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="jason" checked={useUrl} onClick={this.handleCheckBox} />}
                        label="Use URL image?"
                        inputProps={{
                            'aria-label': 'primary checkbox',
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cancel
                     </Button>
                    <Button onClick={handleClose} color="primary" variant="contained">
                        Add
                    </Button>
                </DialogActions>

            </div>
        )
    }
}
