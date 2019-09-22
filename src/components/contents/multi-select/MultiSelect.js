import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';


export default class MultiSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            selected: [],
            input: ""
        }
    }



    handleSearchOption = (e) => {
        let val = e.target.value;
        this.setState({ input: val })
    }

    handleOnChange = (e) => {
        const val = e.target.value;
        if (val !== "") {
            this.setState({
                suggestions: this.props.suggestions.filter(item => item.toUpperCase().includes(val.trim().toUpperCase())).slice(0, 6)
            })
        }
        else {
            this.setState({ suggestions: this.props.suggestions })
        }
    }

    handleSelectItem = (e) => {
        const itemSelect = e.target.dataset.value;
        if (!this.state.selected.includes(itemSelect)) {
            this.setState((state) => {
                return {
                    selected: [...state.selected, itemSelect],
                    suggestions: state.suggestions.filter(item => item !== itemSelect)
                }
            }, () => {
                this.props.onSelectItem(this.state.selected);
            })
        }
    }

    handleRemoveItem = (itemRemove) => {
        this.setState((state) => {
            return {
                selected: state.selected.filter(a => a !== itemRemove),
                suggestions: [...state.suggestions, itemRemove]
            }
        }, () => {
            this.props.onRemoveItem(this.state.selected);
        })
    }

    renderSelectedItem = () => {
        return this.state.selected.map(item => (
            <li className="selected-item" key={item}>
                <span className="rm-btn" onClick={() => this.handleRemoveItem(item)}><ClearIcon /></span> {item}
            </li>))
    }

    renderOptions = () => {
        return this.state.suggestions.map((item, i) => <li key={i} data-value={item} className="opt" onClick={this.handleSelectItem}>{item}</li>)
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

