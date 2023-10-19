import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin.js';
import { useNavigate } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { Button, TextField, Container, Typography, Paper, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import useStyles from './loginFormStyle.js';


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading} = useLogin()
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const classes = useStyles()
    
    const navigate = useNavigate();

    const handle = async(e) => {

        e.preventDefault()

        try {
            setError(null)
            const loginResponse = await login(email, password)
    
                if (loginResponse.isSuccess && loginResponse.isVerified) {
                    setError(null)
                    navigate('/dashboard')
                } else if (loginResponse.isSuccess && !loginResponse.isVerified) {
                    setError('User is not verified');
                    navigate('/verifyemail')
                } else if (!loginResponse.isSuccess && !loginResponse.isVerified) {
                    setError('Password or email is incorrect');
                }
                else if (!loginResponse.isSuccess && !loginResponse.isVerified && !loginResponse.hasWhitelist)
                {
                    setError('Your account is not authorised')
                }
                else {
                    setError('Error logging in - please contact admin');
                }
        } catch (err) {
            setError('Your account is not authorised')
           
        }
    }

           

    return (

        <Container component="main" maxWidth="xs">
             <Paper elevation={3} className={classes.paper}>
                <Typography component="h1" variant="h5">
                    CRL Student Database
                </Typography>
                <form className={classes.form} onSubmit={handle}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    edge="end"
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            )
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isLoading}
                    >
                        Login
                    </Button>

                    {error && <Alert severity="error" style={{ marginTop: '1em' }}>{error}</Alert>}

                    <Button
                        type="button"
                        fullWidth
                        variant="text"
                        color="default"
                        onClick={() => navigate('/signup')}
                    >
                        Don't have a verified account? Sign Up
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}
        

export default Login

