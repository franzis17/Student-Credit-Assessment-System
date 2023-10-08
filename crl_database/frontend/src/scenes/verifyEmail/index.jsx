import { useNavigate } from 'react-router-dom';
import { Alert, CircularProgress, Container, Typography, Button, Box, Paper, Card, CardContent} from "@mui/material";
import { useVerifyEmail, useResendVerification } from "../../hooks/useVerifyEmail.js";
import { useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import useStyles from './verifyEmailStyles.js';


const VerifyEmailPage = () => {
    const {user} = useAuthContext()
    const { isLoading, error, isVerified } = useVerifyEmail()
    const navigate = useNavigate()
    const classes = useStyles()
    const { resendVerification, timeLeft } = useResendVerification(user?.email)

    useEffect(() => { 

        if (isVerified) {
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        }
    }, [isVerified, navigate])

    return (
            <Container component="main" maxWidth="xs" className={classes.root}>
                <Card elevation={3}>
                    <CardContent>
                        {isLoading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Box p={3}>
                                {isVerified ? (
                                    <Box textAlign="center">
                                        <Alert severity="success">
                                            Email successfully verified, redirecting...
                                        </Alert>
                                        <Typography variant="h5">Your email has been verified!</Typography>
                                    </Box>
                                ) : (
                                    <Box textAlign="center">
                                        {error?.error ? (
                                            <Alert severity="error">{error.message}</Alert>
                                        ) : null}
                                        <Typography variant="h4" gutterBottom className={classes.boldText}>
                                            Your email is not yet verified. Please follow the instructions in the email you received.
                                        </Typography>
                                        <Box mt={3}>
                                            <Typography variant="h4" gutterBottom className={classes.boldText}>
                                                Did not receive the verification link? 
                                            </Typography>
                                        </Box>
                                        <Button variant="contained" color="primary" onClick={resendVerification} disabled={timeLeft > 0}>Resend</Button>
                                        {timeLeft > 0 && <Typography 
                                        variant="body1"
                                        component="p"
                                        className={`${classes.boldText} ${classes.largerText}`}
                                         > Please wait {timeLeft} seconds to resend.</Typography>}
                                        <Button variant="contained" color="primary" onClick={() => navigate('/login')} className={classes.loginButton}>
                                            Back to login
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Container>
)}
                            
export default VerifyEmailPage;
