import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';


export default class MultiSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            selected: this.props.selected ? this.props.selected : [],
            input: ""
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.selected.length !== this.state.selected.length) {
            this.setState({ selected: nextProps.selected });
        }
    }

    handleSearchOption = (e) => {
        let val = e.target.value.trim();
        this.setState({ input: val })
    }

    handleOnChange = (e) => {
        const val = e.target.value.trim();
        const { suggestions, onChange } = this.props;
        if (onChange) {
            onChange(val);
        }

        if (val !== "") {
            this.setState({
                suggestions: suggestions.filter(item => item.title.toUpperCase().includes(val.toUpperCase())).slice(0, 6)
            })
        }
        else {
            this.setState({ suggestions: suggestions })
        }
    }

    handleSelectItem = (e) => {
        const value = e.target.dataset.value;
        const title = e.target.textContent;
        const itemSelect = { title, value };
        if (!this.checkContentItem(this.state.selected, itemSelect)) { // TODO: if selected didn't contain item then push it into array
            this.setState((state) => {
                return {
                    selected: state.selected.concat(itemSelect),
                    suggestions: state.suggestions.filter(item => item.title !== itemSelect.title)
                }
            }, () => {
                this.props.onSelectItem(this.state.selected);
            })
        }
    }

    checkContentItem(arr, searchItem) {
        return !!arr.find(item => item.title === searchItem.title);
    }

    handleRemoveItem = (itemRemove) => {
        this.setState((state) => {
            return {
                selected: state.selected.filter(a => a.title !== itemRemove.title),
                suggestions: [...state.suggestions, itemRemove]
            }
        }, () => {
            this.props.onRemoveItem(this.state.selected);
        })
    }

    renderSelectedItem = () => {
        return this.state.selected.map((item) => (
            <li className="selected-item" key={item.title}>
                <span className="rm-btn" onClick={() => this.handleRemoveItem(item)}><ClearIcon /></span> {item.title}
            </li>))
    }

    renderOptions = () => {
        return this.state.suggestions.map((item, i) => <li key={i} data-value={item.value} className="opt" onClick={this.handleSelectItem}>{item.title}</li>)
    }

    render() {
        const { placeholder } = this.props;
        const { input } = this.state;
        const { handleSearchOption, renderOptions, handleOnChange } = this;
        return (
            <div className="multi-select-wrapper">
                <div className="search-wrapper">
                    <SearchIcon />
                    <input className="search-input" onChange={handleSearchOption}
                        placeholder={placeholder} onInput={handleOnChange} autoFocus />
                    <ul className="options" style={{ display: input !== "" ? "block" : "none" }}>
                        {renderOptions()}
                    </ul>
                </div>
                <div className="options-space" style={{ display: input !== "" ? "block" : "none" }}></div>
                <hr />
                <div className="selected-wrapper" >
                    <ul className="selected-list">
                        {this.renderSelectedItem()}
                    </ul>
                </div>
            </div>
        )
    }
}


MultiSelect.propTypes = {
    placeholder: PropTypes.string,
    onSelectItem: PropTypes.func,
    onRemoveItem: PropTypes.func,
    suggestions: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired
}
