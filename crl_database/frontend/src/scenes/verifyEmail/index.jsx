import { useNavigate } from 'react-router-dom';
import { Alert, CircularProgress, Container, Typography, Button} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useVerifyEmail } from "../../hooks/useVerifyEmail.js";
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
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

const VerifyEmailPage = () => {
    const { isLoading, error, isVerified } = useVerifyEmail();
    const navigate = useNavigate();
    const classes = useStyles();


    useEffect(() => { 

        if (isVerified) {
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        }
    }, [isVerified, navigate])

    return (
        <Container component="main" maxWidth="xs" className={classes.root}> 
            {isLoading ? ( 
            <CircularProgress />
            ) : ( 
            <div>
                {isVerified ? (
                    <div>
                        <Alert severity="success">
                            Email successfully verified, redirecting...
                        </Alert>
                        <Typography variant="h5">Your email has been verified!</Typography>
                    </div>
                ) : ( 
                    <div>
                        {error?.error ? ( 
                            <Alert severity="error">{error.message}</Alert>  
                        ) : null}
                        <Typography variant="h4" align="center" gutterBottom className={classes.boldText}>
                        Your email is not yet verified. Please follow the instructions in the email you received.
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => navigate('/login')} className={classes.loginButton}>
                            Login
                        </Button>
                    </div>
                 )}
                </div>
                )}
           </Container>
        );
};

export default VerifyEmailPage;