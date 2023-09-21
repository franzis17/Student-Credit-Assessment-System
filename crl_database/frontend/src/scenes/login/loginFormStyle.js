import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
        borderRadius: '15px'
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    error: {
        color: 'red',
        textAlign: 'center',
        margin: theme.spacing(2, 0)
    }
}));

export default useStyles;