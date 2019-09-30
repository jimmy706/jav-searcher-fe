import React from 'react';
import headerStyle from "./headerStyle";
import { InputBase, } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import prefixUrl from "../../constant/prefix-url";


export default function SearchBox({ onSubmit, suggestions = [], onChange }) {

    const classes = headerStyle();
    return (
        <form className={classes.search} onSubmit={onSubmit}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                name='search'
                autoComplete='off'
                onChange={onChange}
            />
            <ul className={classes.suggestionBox}>
                {suggestions.map(item => (
                    <li key={item.title} className={classes.suggestionItem}>
                        <Link to={item.url} className={classes.suggestionLink}>
                            <img alt="/" src={prefixUrl + item.img} className={classes.suggestionImg} /> {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </form>
    )
}

SearchBox.propTypes = {
    onSubmit: PropTypes.func,
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        img: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string
    })),
    onChange: PropTypes.func,
}
