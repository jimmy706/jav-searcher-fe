import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, TextField, Fab, Grid } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import prefixURL from '../../constant/prefix-url';

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

    componentDidMount() {
        const { name, modelDetail } = this.props.modelInfo;
        if (modelDetail) {
            this.setState({
                name: name,
                born: new Date(modelDetail.born),
                waist: modelDetail.waist,
                hips: modelDetail.hips,
                height: modelDetail.height,
                breast: modelDetail.breast
            })
        }
        else {
            this.setState({ name: name });
        }
    }

    handleSubmit = () => {
        const { id } = this.props.modelInfo;
        const { name, born, breast, waist, hips, height } = this.state;

        axios({
            url: prefixURL + "/models/update-model-info/" + id,
            method: 'put',
            data: {
                born: born,
                breast: parseInt(breast),
                waist: parseInt(waist),
                hips: parseInt(hips),
                height: parseInt(height)
            }
        })
            .then(res => {
                this.props.handleChangeModelDetail(res.data.modelDetail);
                if (name !== this.props.modelInfo.name) {
                    axios({
                        url: prefixURL + "/models/change-name/" + id,
                        params: { name: name },
                        method: 'put'
                    })
                        .then(result => {
                            this.props.handleChangeName(result.data.name);
                            this.props.closeModal();
                        })
                }
                else {
                    this.props.closeModal();
                }
            })
            .catch(console.log);
    }

    handleChangeValueInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChangeDate = (date) => {
        this.setState({ born: date })
    }

    render() {
        const { closeModal } = this.props;
        const { name, born, breast, waist, hips, height } = this.state;
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
                        value={name}
                    />
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="normal"
                                id="breast"
                                label="Breast"
                                type="number"
                                fullWidth
                                name="breast"
                                autoComplete="off"
                                onChange={this.handleChangeValueInput}
                                value={breast}
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
                                value={waist}
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
                                value={hips}
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
                                value={height}
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
