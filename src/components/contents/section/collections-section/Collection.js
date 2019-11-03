import React, { useState } from 'react';
import CollectionsIcon from '@material-ui/icons/Collections';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import { Link } from "react-router-dom";
import { Menu, MenuItem, Popover } from "@material-ui/core";
import axios from "axios";
import prefixUrl from "../../../../constant/prefix-url";

const themes = ["#83B0C4", "#F83A22", "#1A91DA", "#A47AE2", "#20AC3E"];

const colorPickStyle = {
    display: "inline-block",
    borderRadius: "50%",
    width: "10px",
    height: "10px",
    cursor: "pointer",
    margin: "0 5px"
}

const themeContainerStyle = {
    padding: "10px"
}

export default function Collection({ collection, onDeleteCollection }) {

    let [theme, setTheme] = useState(collection.theme);
    let [anchorEl1, setAnchorEl1] = useState(null);
    let [anchorEl2, setAnchorEl2] = React.useState(null);

    const handleClick = event => {
        setAnchorEl1(event.currentTarget);
    };

    const handleCloseMenu1 = () => {
        setAnchorEl1(null);
    };

    const changeTheme = (theme) => {
        axios({
            url: `${prefixUrl}/collections/change-theme/${collection.id}`,
            params: {
                theme: theme
            },
            method: 'put'
        })
            .then(res => {
                setTheme(theme);
            })
            .catch(console.log);
    }

    const openPopover = (e) => {
        setAnchorEl2(e.currentTarget);
    }

    const handleClosePopOver = () => {
        setAnchorEl2(null);
    }

    const handleDeleteCollection = () => {
        onDeleteCollection(collection.id);
    }

    return (
        <div className="collection" title={collection.collectionName}>
            <div className="collection-header">
                <MoreHorizIcon className="toggle" onClick={handleClick} />
            </div>
            <Link className="collection-content" to={"/collections/view/" + collection.collectionName}>
                <CollectionsIcon style={{ fill: theme }} /> {collection.collectionName}
            </Link>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl1}
                keepMounted
                open={Boolean(anchorEl1)}
                onClose={handleCloseMenu1}
            >
                <MenuItem onClick={openPopover}><ColorLensIcon style={{ marginRight: "5px" }} />Change theme</MenuItem>
                <MenuItem onClick={handleDeleteCollection}><DeleteIcon style={{ marginRight: "5px" }} />Delete</MenuItem>
            </Menu>
            <Popover
                open={Boolean(anchorEl2)}
                anchorEl={anchorEl2}
                onClose={handleClosePopOver}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <ul style={themeContainerStyle}>
                    {themes.map(theme => <li key={theme} style={{ background: theme, ...colorPickStyle }} className="color-pick" onClick={() => changeTheme(theme)}></li>)}
                </ul>
            </Popover>
        </div>
    )
}
