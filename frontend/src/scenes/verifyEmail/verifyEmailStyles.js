import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: "bold"
  },
  largerText: {
    fontSize: "2rem" 
  },
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(3),
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // This centers horizontally.
        justifyContent: 'center', // This centers vertically.
      },
    alert: {
      marginBottom: theme.spacing(2),
    },
    boldText: {
        fontWeight: 'bold',
        padding: theme.spacing(2)
    },
    loginButton: {
        marginTop: theme.spacing(2),
        color: '#ffffff',
        width: '400px',
        paddingLeft: '50px',
        paddingRight: '50px',
        fontSize: 'larger', // increase font size
        padding: theme.spacing(2), 
        backgroundColor: '#007bff',
        '&:hover': {
            backgroundColor: '#1565c0'
    }
   }
  }));

  export default makeStyles