import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, Fab } from "@material-ui/core";
import axios from "axios";
import prefixUrl from "../../constant/prefix-url";
import MultiSelect from '../multi-select/MultiSelect';
import PropTypes from 'prop-types';


export default class ModelUpdateMovieInVolveForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestionMovies: [],
            selectedMovies: this.props.selected
        }
    }

    selectMovie = (selected) => {
        this.setState({ selectedMovies: selected });
    }

    removeMovie = (selected) => {
        this.setState({ selectedMovies: selected });
    }

    onChangeInput = (val) => {
        axios(prefixUrl + "/movies/find-all-by-movieId?movieId=" + val)
            .then(res => {
                this.setState({ suggestionMovies: res.data.map(movie => movie.movieId) })
            })
            .catch(console.log);
    }

    handleSubmit = () => {
        axios({
            url: prefixUrl + "/models/update-movie-involve/" + this.props.modelId,
            method: 'put',
            params: {
                movieIds: this.state.selectedMovies
            }
        })
            .then(res => {
                this.props.updateMovieInvolve(res.data.moviesInvolve);
                this.props.closeModal();
            })
            .catch(console.log);
    }


    render() {
        const { suggestionMovies, selectedMovies } = this.state;
        return (
            <div className="modal">
                <DialogTitle>Update movies involve:</DialogTitle>
                <DialogContent>
                    {<MultiSelect suggestions={suggestionMovies}
                        placeholder="Type to search movie"
                        onSelectItem={this.selectMovie}
                        onRemoveItem={this.removeMovie}
                        selected={selectedMovies}
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


ModelUpdateMovieInVolveForm.propTypes = {
    closeModal: PropTypes.func,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    modelId: PropTypes.string.isRequired
}