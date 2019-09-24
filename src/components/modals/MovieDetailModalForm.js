import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, TextField, Fab, Grid, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import axios from "axios";
import prefixUrl from "../../constant/prefix-url";

let studios = [];

export default class MovieDetailModalForm extends Component {
    constructor(props) {
        super(props);

        const { content, movieName, studio, releaseDate, length, link } = this.props.movieDetail;

        this.state = {
            movieName: movieName ? movieName : '',
            studio: studio ? studio : '',
            releaseDate: releaseDate ? new Date(releaseDate) : new Date(),
            content: content ? content : '',
            length: length ? length : 60,
            link: link ? link : '',
            openSelect: false
        }
    }

    handleOpenSelect = () => {
        this.setState({ openSelect: true })
    }

    handleCloseSelect = () => {
        this.setState({ openSelect: false })
    }

    componentDidMount() {
        axios.get(prefixUrl + "/studios/all")
            .then(res => {
                studios = res.data.map(studio => studio.stdudioName);
            })
    }

    componentWillUnmount() {
        studios = [];
    }

    handleChangeValueInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleChangeDate = (date) => {
        this.setState({
            releaseDate: date
        })
    }

    handleSubmit = () => {
        const { movieName, studio, releaseDate, content, link, length } = this.state;
        axios({
            url: prefixUrl + "/movies/update-movie-info/" + this.props.movieId,
            method: "post",
            data: {
                movieName: movieName,
                studio: studio,
                releaseDate: releaseDate,
                content: content,
                link: link,
                length: parseInt(length)
            }
        })
            .then(res => {
                console.log(res);
                this.props.changeMovieInfo("movieDetail", { movieName, studio, releaseDate, content, link, length })
                this.props.closeModal();
            })
            .catch(console.log);
    }

    renderStudiosOption = () => {
        return studios.map(studio => (<MenuItem key={studio} value={studio}>{studio}</MenuItem>))
    }

    render() {
        const { closeModal } = this.props;
        const { content, movieName, studio, releaseDate, length, link, openSelect } = this.state;
        return (
            <div className="modal">
                <DialogTitle>Edit movie detail:</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="normal"
                                id="movieName"
                                label="Movie name"
                                type="text"
                                fullWidth
                                name="movieName"
                                autoComplete="off"
                                onChange={this.handleChangeValueInput}
                                value={movieName}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="releaseDate"
                                    label="Release date"
                                    name="releaseDate"
                                    onChange={this.handleChangeDate}
                                    value={releaseDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel htmlFor="open-select">Studio</InputLabel>
                                <Select
                                    open={openSelect}
                                    onClose={this.handleCloseSelect}
                                    onOpen={this.handleOpenSelect}
                                    onChange={this.handleChangeValueInput}
                                    name="studio"
                                    inputProps={{
                                        name: 'studio',
                                        id: 'open-select',
                                    }}
                                    value={studio}
                                >
                                    {this.renderStudiosOption()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                id="length"
                                label="Length"
                                type="text"
                                fullWidth
                                name="length"
                                autoComplete="off"
                                onChange={this.handleChangeValueInput}
                                value={length}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        margin="normal"
                        id="link"
                        label="Link"
                        type="url"
                        fullWidth
                        name="link"
                        autoComplete="off"
                        onChange={this.handleChangeValueInput}
                        value={link}
                    />
                    <textarea className="textarea" name="content" placeholder="Write movie's description here..." onChange={this.handleChangeValueInput} value={content}></textarea>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="default">
                        Cancel
                     </Button>
                    <Fab variant="extended" onClick={this.handleSubmit} color="primary" size="medium">
                        Save
                    </Fab>
                </DialogActions>
            </div>
        )
    }
}
