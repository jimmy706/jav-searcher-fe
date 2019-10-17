import React, { useState } from 'react';
import { Button, Menu, MenuItem, makeStyles } from "@material-ui/core";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { connect } from "react-redux";
import { updateDurationFilterAct } from "../../../actions/filterMovies.action";

const sortMaps = [{ key: "All", value: 0 }, { key: "10+ mins", value: 10 }, { key: "20+ mins", value: 20 }, { key: "30+ mins", value: 30 }];
const styles = makeStyles({
    button: {
        width: "100%"
    },
    icon: {
        marginRight: "10px"
    }
})

function DurationFilter(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [duration, setDuration] = useState(sortMaps.findIndex(item => item.value === props.duration));
    const classes = styles();

    function openMenu(e) {
        setAnchorEl(e.currentTarget);
    }

    function closeMenu() {
        setAnchorEl(null);
    }

    function handleMenuItemClick(index) {
        setDuration(index);
        props.updateDurationFilter(sortMaps[index].value);
        closeMenu();
    }

    return (
        <div className="filter-component" title="Set duration">
            <Button className={classes.button} variant="outlined" aria-haspopup="true" onClick={openMenu}><QueryBuilderIcon className={classes.icon} /> {sortMaps[duration].key}</Button>
            <Menu
                id="sort-movie"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeMenu}
                className={classes.menu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {sortMaps.map((option, index) => <MenuItem key={option.key} selected={index === duration} onClick={() => handleMenuItemClick(index)}>{option.key}</MenuItem>)}
            </Menu>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        duration: state.movieFilter.duration
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateDurationFilter: (duration) => dispatch(updateDurationFilterAct(duration))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DurationFilter);