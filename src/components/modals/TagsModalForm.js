import React, { useEffect } from 'react';
import { DialogActions, DialogContent, DialogTitle, Button, Fab, Chip, Typography, NoSsr, MenuItem, Paper, TextField } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import axios from "axios";
import prefixUrl from "../../constant/prefix-url";
import Select from "react-select";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: 250,
        minWidth: 290,
    },
    input: {
        display: 'flex',
        padding: 0,
        height: 'auto',
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: theme.spacing(1, 2),
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        bottom: 6,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing(2),
    },
}));


function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}


function Control(props) {
    const {
        children,
        innerProps,
        innerRef,
        selectProps: { classes, TextFieldProps },
    } = props;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: classes.input,
                    ref: innerRef,
                    children,
                    ...innerProps,
                },
            }}
            {...TextFieldProps}
        />
    );
}


function Option(props) {
    return (
        <MenuItem
            ref={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    const { selectProps, innerProps = {}, children } = props;
    return (
        <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
            {children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={clsx(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}


const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

// TODO: main 
export default function TagsModalForm(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [multi, setMulti] = React.useState(null);
    const [tags, setTags] = React.useState([]);


    useEffect(() => {
        axios(prefixUrl + "/tags/all-tags")
            .then(res => {
                setTags(res.data.map(tag => ({
                    value: tag,
                    label: tag,
                })))
            })
            .catch(console.log)
    })


    function handleChangeMulti(value) {
        setMulti(value);
    }

    const selectStyles = {
        input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit',
            },
        }),
    };

    return (
        <div className="modal">
            <DialogTitle>Update tags:</DialogTitle>
            <DialogContent>
                <div className={classes.root}>
                    <NoSsr>
                        <Select
                            classes={classes}
                            styles={selectStyles}
                            inputId="react-select-multiple"
                            TextFieldProps={{
                                label: 'Tags',
                                InputLabelProps: {
                                    htmlFor: 'react-select-multiple',
                                    shrink: true,
                                },
                            }}
                            placeholder="Select multiple tags"
                            options={tags}
                            components={components}
                            value={multi}
                            onChange={handleChangeMulti}
                            isMulti />
                    </NoSsr>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeModal} color="default">
                    Cancel
                     </Button>
                <Fab variant="extended" color="primary" size="medium">
                    Save
                    </Fab>
            </DialogActions>
        </div>
    )
}

