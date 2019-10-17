import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, Fab } from "@material-ui/core";
import axios from "axios";
import prefixUrl from "../../constant/prefix-url";
import { connect } from "react-redux";
import { updateStudioFilterAct } from "../../actions/filterMovies.action";

class StudioPickerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studios: [],
            selectedStudio: this.props.selectedStudio
        }
    }

    componentDidMount() {
        axios(`${prefixUrl}/studios/all`)
            .then(studios => {
                this.setState({ studios: studios.data.map(studio => studio.studioName) });
            })
            .catch(console.log);
    }

    handleSubmit = () => {
        this.props.updateStudioFilter(this.state.selectedStudio);
        this.props.closeModal();
    }

    handleOnClick = (e) => {
        const data = e.target.dataset.studio;
        if (data !== this.state.selectedStudio) {
            this.setState({
                selectedStudio: data
            })
        }
        else {
            this.setState({ selectedStudio: '' });
        }
    }

    renderStudios = () => {
        const { studios, selectedStudio } = this.state;
        return studios.map(studio => <button key={studio}
            className={`select-btn ${selectedStudio === studio ? "active" : ""}`}
            onClick={this.handleOnClick} data-studio={studio}>{studio}</button>)
    }

    render() {
        return (
            <div className="modal">
                <DialogTitle>STUDIOS:</DialogTitle>
                <DialogContent>
                    {this.renderStudios()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeModal} color="default">
                        Cancel
                     </Button>
                    <Fab variant="extended" color="primary"
                        size="medium"
                        onClick={this.handleSubmit}>
                        Save
                    </Fab>
                </DialogActions>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedStudio: state.movieFilter.studio
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStudioFilter: (studio) => dispatch(updateStudioFilterAct(studio))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudioPickerModal);