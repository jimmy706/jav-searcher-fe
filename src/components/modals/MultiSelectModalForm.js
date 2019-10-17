import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, Fab } from "@material-ui/core";
import MultiSelect from '../multi-select/MultiSelect';
import PropTypes from "prop-types";



export default class MultiSelectModelForm extends Component {


    selectItem = (selectedArr) => {
        this.props.onSelectItem(selectedArr);
    }

    removeItem = (removedArr) => {
        this.props.onRemoveItem(removedArr);
    }

    onChangeInput = (val) => {
        this.props.onChangeInput(val);
    }

    handleSubmit = () => {
        this.props.onSubmit();
    }

    render() {
        const { title, suggestions, selected } = this.props;
        return (
            <div className="modal">
                <DialogTitle>{title ? title : "Title"}:</DialogTitle>
                <DialogContent>
                    {
                        <MultiSelect suggestions={suggestions.map(item => ({ title: item.title, value: item.value }))}
                            placeholder="Type to search..."
                            onSelectItem={this.selectItem}
                            onRemoveItem={this.removeItem}
                            selected={selected.map(item => ({ title: item.title, value: item.value }))}
                            onChange={this.onChangeInput} />
                    }
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


MultiSelectModelForm.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.value
    })).isRequired,
    selected: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.value
    })).isRequired,
    title: PropTypes.string,
    closeModal: PropTypes.func,
    onChangeInput: PropTypes.func,
    onRemoveItem: PropTypes.func,
    onSelectItem: PropTypes.func,
    onSubmit: PropTypes.func
};