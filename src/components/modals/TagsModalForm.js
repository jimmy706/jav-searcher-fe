import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, Fab } from "@material-ui/core";
import axios from "axios";
import prefixUrl from "../../constant/prefix-url";
import MultiSelect from '../multi-select/MultiSelect';

// TODO: temp variable to contain all tag
let allTags = [];

export default class TagsModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [], // TODO: use for suggestion props of <MultiSelect/>
            selected: this.props.selected
        }
    }

    componentDidMount() {
        axios.get(prefixUrl + "/tags/all-tags")
            .then(res => {
                allTags = res.data;
                this.setState({ tags: res.data })
            })
            .catch(console.log)
    }

    selectItem = (selectedArr) => {
        this.setState({
            selected: [...selectedArr],
            tags: allTags.filter(tag => !selectedArr.find(a => a === tag))
        })
    }

    removeItem = (removedArr) => {
        this.setState({
            selected: [...removedArr],
            tags: allTags.filter(tag => !removedArr.find(a => a === tag)) // add to tags for suggestion props
        })
    }

    handleSubmit = () => {

        axios({
            url: prefixUrl + "/movies/set-tags/" + this.props.movieId,
            params: {
                tags: [...this.state.selected]
            },
            method: "put"
        })
            .then(res => {
                this.props.changeMovieInfo("tags", this.state.selected);
                this.props.closeModal();
            })
            .catch(console.log);
    }

    render() {
        const { tags, selected } = this.state;
        return (
            <div className="modal">
                <DialogTitle>Update tags:</DialogTitle>
                <DialogContent>
                    {tags.length ? <MultiSelect suggestions={tags}
                        placeholder="Type to search tag"
                        onSelectItem={this.selectItem}
                        onRemoveItem={this.removeItem}
                        selected={selected} /> : null}
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


