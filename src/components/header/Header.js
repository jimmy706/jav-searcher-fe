import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Menu, MenuItem, Button } from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const headerStyle = makeStyles(theme => ({
    root: {
        backgroundColor: "#070D13",
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    menuSelect: {
        position: 'relative',
        marginLeft: '15px',
        textTransform: 'capitalize'
    },
}));

const options = ['Movie code', 'Model name'];

export default function Header(props) {
    const classes = headerStyle();
    let [openMenu, setOpenMenu] = useState(null);
    let [selectedIndex, setSelectedIndex] = useState(0);

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
        const form = e.target;
        const inputValue = form.querySelector("input[name='search']").value;
        console.log(inputValue);
        form.reset();
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
                <form className={classes.search} onSubmit={handleSubmit}>
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
                    />
                </form>
                <div className={classes.menuSelect}>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpen}>
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
