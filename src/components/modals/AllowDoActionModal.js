import React from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, DialogContentText, Fab } from "@material-ui/core";
import PropTypes from "prop-types";

export default function AllowDoActionModal(props) {

    function handleConfirm(isAllow) {
        props.onConfirm(isAllow);
        props.closeModal();
    }

    return (
        <div className="modal">
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Fab variant="extended" onClick={() => handleConfirm(false)} color="primary" size="small">
                    Cancle
                </Fab>
                <Button onClick={() => handleConfirm(true)} color="default">
                    Yes
                </Button>
            </DialogActions>
        </div>
    )
}

AllowDoActionModal.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    onConfirm: PropTypes.func,
    closeModal: PropTypes.func.isRequired
}