import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, Fab } from "@material-ui/core";
import axios from "axios";
import prefixUrl from "../../constant/prefix-url";
import MultiSelect from '../contents/multi-select/MultiSelect';

// TODO: temp variable to contain all tag
let allTags = [];

export default class TagsModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [], // TODO: use for suggestion props of <MultiSelect/>
            selected: []
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

    }

    render() {
        const { tags } = this.state;
        return (
            <div className="modal">
                <DialogTitle>Update tags:</DialogTitle>
                <DialogContent>
                    {tags.length ? <MultiSelect suggestions={tags}
                        placeholder="Type to search tag"
                        onSelectItem={this.selectItem}
                        onRemoveItem={this.removeItem} /> : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeModal} color="default">
                        Cancel
                     </Button>
                    <Fab variant="extended" color="primary" size="medium">
                        Save
                    </Fab>
                </DialogActions>
            </div>
        )
    }
}


