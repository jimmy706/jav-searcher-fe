import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";
import headerStyle from "./headerStyle";
import SearchBox from './SearchBox';
import prefixUrl from "../../constant/prefix-url";

const options = ['Movie code', 'Model name'];

export default function Header(props) {
    const classes = headerStyle();
    let [openMenu, setOpenMenu] = useState(null);
    let [selectedIndex, setSelectedIndex] = useState(0);
    let [suggestions, setSuggestions] = useState([]);

    function handleClose() {
        setOpenMenu(null);
    }

    function handleOpen(e) {
        setOpenMenu(e.currentTarget);
    }

    function handleMenuItemClick(index) {
        setSelectedIndex(index);
        setOpenMenu(null);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    function handleInputChange(e) {
        const val = e.target.value.trim();
        if (val !== '') {
            switch (selectedIndex) {
                case 1:
                    axios(prefixUrl + "/models/find-by-name?name=" + val)
                        .then(res => {
                            setSuggestions(res.data.map(model => ({ title: model.name, img: model.avatar, url: "/models/detail/" + model.id })));
                        })
                        .catch(console.log);
                    break;
                default:
                    axios(prefixUrl + "/movies/find-all-by-movieId?movieId=" + val)
                        .then(res => {
                            setSuggestions(res.data.map(movie => ({ title: movie.movieId, img: movie.movieImage, url: "/movies/detail/" + movie.movieId })));
                        })
                        .catch(console.log);
                    break;
            }
        }
        else {
            setSuggestions([]);
        }
    }


    return (
        <AppBar position="fixed" className={classes.root}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={props.toggleDrawer()} className={classes.menuButton}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" noWrap className={classes.title}>
                    <Link to="/" style={{ color: "#fff" }} title="Back to home page">
                        Home
                    </Link>
                </Typography>
                <SearchBox onSubmit={handleSubmit} onChange={handleInputChange} suggestions={suggestions} />
                <div className={classes.menuSelect}>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpen} title="change search content">
                        {options[selectedIndex]} < ExpandMoreIcon />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={openMenu}
                        keepMounted
                        open={Boolean(openMenu)}
                        onClose={handleClose}
                    >
                        {options.map((option, index) => <MenuItem key={option} selected={index === selectedIndex} onClick={() => handleMenuItemClick(index)}>{option}</MenuItem>)}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}
