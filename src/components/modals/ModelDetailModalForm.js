import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, TextField, Fab, Grid } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


export default class ModelDetailModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            born: new Date(),
            breast: 0,
            waist: 0,
            hips: 0,
            height: 0
        }
    }

    handleSubmit = () => {

    }

    handleChangeValueInput = () => {

    }

    handleChangeDate = () => {

    }

    render() {
        const { closeModal } = this.props;
        const { born } = this.state;
        return (
            <div className="modal">
                <DialogTitle>Edit model info:</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        name="name"
                        autoComplete="off"
                        autoFocus
                        onChange={this.handleChangeValueInput}
                    />
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="normal"
                                id="bearst"
                                label="Bearst"
                                type="number"
                                fullWidth
                                name="bearst"
                                autoComplete="off"
                                onChange={this.handleChangeValueInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="normal"
                                id="waist"
                                label="Waist"
                                type="number"
                                fullWidth
                                name="waist"
                                autoComplete="off"
                                onChange={this.handleChangeValueInput}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="normal"
                                id="hips"
                                label="Hips"
                                type="number"
                                fullWidth
                                name="hips"
                                autoComplete="off"
                                onChange={this.handleChangeValueInput}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="normal"
                                id="height"
                                label="Height"
                                type="number"
                                fullWidth
                                name="height"
                                autoComplete="off"
                                onChange={this.handleChangeValueInput}
                            />
                        </Grid>
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="born"
                            label="Birthday"
                            name="born"
                            onChange={this.handleChangeDate}
                            value={born}
                            fullWidth
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
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
