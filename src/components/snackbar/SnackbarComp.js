import React from 'react';
import { connect } from 'react-redux';
import { Snackbar, SnackbarContent } from "@material-ui/core";
import { closeSnackbarAction } from "../../actions/snackbar.action";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { amber, green } from '@material-ui/core/colors';
import clsx from "clsx";


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[800],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));


function SnackbarComp(props) {
    const { snackbarState, closeSnackbar } = props;
    const classes = useStyles();
    const Icon = variantIcon[snackbarState.variant];
    return (
        <Snackbar open={snackbarState.openSnackbar}
            onClose={closeSnackbar}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            autoHideDuration={6000}
        >
            <SnackbarContent
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={clsx(classes.icon, classes.iconVariant)} />
                        {snackbarState.message}
                    </span>
                }
                className={classes[snackbarState.variant]}
                action={[
                    <IconButton key="close" aria-label="close" color="inherit" onClick={closeSnackbar}>
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    )
}
const mapStateToProp = (state) => {
    return {
        snackbarState: state.snackbarState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeSnackbar: () => dispatch(closeSnackbarAction())
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(SnackbarComp);