import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, TextField, Checkbox, FormControlLabel, Fab } from "@material-ui/core";
import axios from "axios";
import DragNDrop from "../dragndrop/DragNDrop";
import prefixUrl from "../../constant/prefix-url";

export default class MovieModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useUrl: true,
            movieImg: null,
            movieId: '',
            url: ''
        }
    }

    handleAddMovie = () => {
        const { useUrl, movieId, movieImg, url } = this.state;
        if (useUrl) {
            axios({
                url: prefixUrl + "/movies/add-movie-with-url",
                params: {
                    movieId: movieId,
                    url: url
                },
                method: 'POST'
            })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => console.log(err));
        }
        else {
            let formData = new FormData();
            formData.append("movieImg", this.state.movieImg);

            // FIXME: check if this is a multiple ???
            console.log(formData);
            // axios({
            //     url: prefixUrl + "/movies/add-movie",
            //     params: JSON.stringify({ movieId: movieId, movieImg: formData }),
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            //     .then(res => {
            //         console.log(res.data);
            //     })
            //     .catch(err => console.log(err));
        }
    }

    handleUploadFile = (movieImg) => {
        this.setState({ movieImg })
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
        const { handleClose } = this.props;
        const { useUrl } = this.state;
        return (
            <div className="modal">
                <DialogTitle>
                    Add new movie
                </DialogTitle>

                <DialogContent >
                    {
                        (useUrl) ? null : <DragNDrop handleUploadFile={this.handleUploadFile} />
                    }
                    <TextField
                        autoFocus
                        margin="normal"
                        id="movieId"
                        label="Movie ID"
                        type="text"
                        fullWidth
                        name="movieId"
                        autoComplete="off"
                        onChange={this.handleChangeValueInput}
                    />
                    <TextField
                        type="text"
                        id="url"
                        label="Movie image URL"
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
                    <Fab variant="extended" onClick={this.handleAddMovie} color="primary" size="medium">
                        Save
                    </Fab>
                </DialogActions>

            </div>
        )
    }
}
