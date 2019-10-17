import React from 'react';
import SortMovie from './SortMovie';
import DurationFilter from './DurationFilter';
import { Button, makeStyles } from "@material-ui/core";
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import FilterListIcon from '@material-ui/icons/FilterList';
import LabelIcon from '@material-ui/icons/Label';

const styles = makeStyles({
    icon: {
        marginRight: "10px"
    }
})

export default function MovieFilterContainer(props) {
    const classes = styles();
    return (
        <div className="filter-container">
            <Button variant="outlined" className="filter-component" onClick={() => props.handleOpenModal("TAGS")}>
                <LabelIcon className={classes.icon} /> Tags
            </Button>
            <Button variant="outlined" className="filter-component" onClick={() => props.handleOpenModal("MODELS")}>
                <FilterListIcon className={classes.icon} /> Models
            </Button>
            <Button variant="outlined" className="filter-component" onClick={() => props.handleOpenModal("STUDIOS")}>
                <MovieFilterIcon className={classes.icon} /> Studios
            </Button>
            <DurationFilter />
            <SortMovie />
        </div>
    )
}

