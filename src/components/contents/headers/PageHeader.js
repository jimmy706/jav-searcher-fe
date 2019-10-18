import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from "prop-types";

export default function PageHeader(props) {
    return (
        <div className="page-header">
            <button className="back-btn" title="Back to previous page" onClick={() => props.history.goBack()}>
                <ArrowBackIcon />
            </button>
            <span className="page-title">{(props.title) ? (`${props.title}: `) : ""}</span>
            <div className="interact-area">
                {props.children}
            </div>
        </div>
    )
}

PageHeader.propTypes = {
    history: PropTypes.object.isRequired
}