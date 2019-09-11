import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, TextField, Fab, Grid } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';



export default class MovieDetailModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            movieName: '',
            studio: '',
            releaseDate: new Date(),
            content: '',
            length: 60,
            link: ''
        }
    }

    handleChangeValueInput = (e) => {
        console.log(e.target.value);
    }

    handleChangeDate = (date) => {
        this.setState({
            releaseDate: date
        })
    }

    handleSubmit = () => {

    }

    render() {
        const { closeModal } = this.props;
        const { releaseDate } = this.state;
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
                            <TextField
                                margin="normal"
                                id="studio"
                                label="Studio"
                                type="text"
                                fullWidth
                                name="studio"
                                autoComplete="off"
                                onChange={this.handleChangeValueInput}
                            />
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
                    />
                    <textarea className="textarea" name="content" placeholder="Write movie's description here..."></textarea>
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
