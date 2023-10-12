import { makeStyles, Container, Grid } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    customSpacing: {
       margin: theme.spacing(0.5),  // Adjusts margin
       padding: theme.spacing(0.5) // Adjusts padding
    },
    centeredContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'  // Takes up the full height of the viewport
    },
    compactTable: {
      padding: theme.spacing(0.5),
      '& td, & th': {
        padding: theme.spacing(0.5),
      },
    },
    palette: {
        button: '#3169c3',
        remove: '#b63536',
      },
  }));

export default useStyles
