import React, { Component } from 'react';
import { Dialog, DialogActions, Button, DialogContent, TextField, Fab, DialogTitle } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import prefixUrl from "../constant/prefix-url";
import { Link } from "react-router-dom";
import PageHeader from './contents/headers/PageHeader';
import { updateStudioFilterAct } from "../actions/filterMovies.action";
import { connect } from "react-redux";


class Studios extends Component {
    constructor(props) {
        super(props);
        this.inputText = '';
        this.state = {
            studios: [],
            openModal: false
        }
    }

    handleOpenModal = () => this.setState({ openModal: true })

    handleCloseModal = () => this.setState({ openModal: false })

    componentDidMount() {
        axios.get(prefixUrl + "/studios/all")
            .then(res => {
                this.setState({ studios: res.data })
            })
            .catch(console.log);
    }

    renderStudios = () => {
        const { studios } = this.state;
        return studios.map(studio => <Link key={studio.id}
            to={"/movies/all?studio=" + studio.studioName}
            onClick={() => this.props.updateStudioFilter(studio.studioName)}
            className="studio">{studio.studioName}</Link>);
    }

    handleSubmit = () => {
        if (this.inputText.trim() !== '') {
            axios({
                url: `${prefixUrl}/studios/add-studio`,
                params: {
                    studioName: this.inputText
                },
                method: 'post'
            })
                .then(newStudio => {
                    this.setState((state) => {
                        return {
                            studios: [...state.studios, newStudio.data],
                            openModal: false
                        }
                    })
                })
                .catch(console.log);
        }
    }

    handleChangeInput = (e) => {
        this.inputText = e.target.value;
    }


    render() {
        return (
            <div>
                <PageHeader title="Studios" history={this.props.history}>
                    <Fab color="primary" size="small" title="Add new studio" onClick={this.handleOpenModal}>
                        <AddIcon />
                    </Fab>
                </PageHeader>
                <div className="studio-content section-container">
                    {this.renderStudios()}
                </div>
                <Dialog open={this.state.openModal} onClose={this.handleCloseModal}>
                    <div className="modal">
                        <DialogTitle>Add new studio:</DialogTitle>
                        <DialogContent>
                            <TextField fullWidth margin="normal" onChange={this.handleChangeInput} placeholder="Type studio name" name="studio" ></TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseModal} color="default">
                                Cancel
                            </Button>
                            <Fab variant="extended" onClick={this.handleSubmit} color="primary" size="medium">
                                Add new
                        </Fab>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStudioFilter: (studio) => dispatch(updateStudioFilterAct(studio))
    }
}

export default connect(null, mapDispatchToProps)(Studios);