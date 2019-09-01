import React from 'react';
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const headerStyle = makeStyles({
    root: {
        backgroundColor: "#070D13",
    }
})

export default function Header(props) {
    const style = headerStyle();
    return (
        <AppBar position="fixed" className={style.root}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={props.toggleDrawer()}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
