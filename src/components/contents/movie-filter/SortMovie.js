import React, { useState } from 'react';
import { Button, Menu, MenuItem, makeStyles } from "@material-ui/core";
import SortIcon from '@material-ui/icons/Sort';
import { connect } from "react-redux";
import { updateSortFilterAct } from "../../../actions/filterMovies.action";

const sortMaps = [{ key: "A-Z", value: 1 }, { key: "Z-A", value: -1 }];
const styles = makeStyles({
    button: {
        width: "100%"
    },
    icon: {
        marginRight: "10px"
    }
})

function SortMovie(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [sortType, setSortType] = useState(sortMaps.findIndex(item => item.value === props.sort));
    const classes = styles();

    function openMenu(e) {
        setAnchorEl(e.currentTarget);
    }

    function closeMenu() {
        setAnchorEl(null);
    }

    function handleMenuItemClick(index) {
        setSortType(index);
        props.updateSortFilter(sortMaps[index].value);
        closeMenu();
    }

    return (
        <div className="filter-component" title="Sort movies">
            <Button className={classes.button} variant="outlined" aria-haspopup="true" onClick={openMenu}><SortIcon className={classes.icon} /> {sortMaps[sortType].key}</Button>
            <Menu
                id="sort-movie"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeMenu}
                className={classes.menu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {sortMaps.map((option, index) => <MenuItem key={option.key} selected={index === sortType} onClick={() => handleMenuItemClick(index)}>Sort by: {option.key}</MenuItem>)}
            </Menu>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sort: state.movieFilter.sort
    }
}

const mapDispatchToProsp = (dispatch) => {
    return {
        updateSortFilter: (sort) => dispatch(updateSortFilterAct(sort))
    }
}
export default connect(mapStateToProps, mapDispatchToProsp)(SortMovie);