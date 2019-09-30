import { fade, makeStyles } from '@material-ui/core/styles';

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
    suggestionBox: {
        position: 'absolute',
        width: '100%',
        top: '25px',
        zIndex: 100,
        boxShadow: '2px 3px 5px rgba(0,0,0,0.3)'
    },
    suggestionItem: {
        backgroundColor: '#0B2239',
        '&:hover': {
            backgroundColor: '#041323'
        },
        '&:first-child': {
            borderTopRightRadius: '5px',
            borderTopLeftRadius: '5px',
        },
        '&:last-child': {
            borderBottomRightRadius: '5px',
            borderBottomLeftRadius: '5px'
        }
    },
    suggestionLink: {
        color: '#fff',
        display: 'flex',
        lineHeight: '2',
        backgroundColor: 'inherit',
        '&:hover': {
            color: '#fff'
        },
        padding: '10px 15px',
        alignItems: 'center',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    suggestionImg: {
        display: 'inline-block',
        width: '40px',
        height: '40px',
        marginRight: '15px'
    }
}));

export default headerStyle;