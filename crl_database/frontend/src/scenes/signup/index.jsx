//User signs themselves up -> need email whitelist first
import { useState, useEffect } from 'react';
import { useSignup } from "../../hooks/useSignup"
import { useNavigate } from 'react-router-dom';
import { useWhitelistCheck } from '../../hooks/useWhitelistCheck';
import { useGetRoleID } from '../../hooks/useGetRoleID';
import { Button, TextField, Paper, Typography, Container } from '@material-ui/core';
import useStyles from './signupFormStyle.js'
import Alert from '@material-ui/lab/Alert';

const Signup = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [curtinID, setCurtinID] = useState('')
    const {signup, error, isLoading} = useSignup()
    const navigate = useNavigate();
    const { isWhitelisted } = useWhitelistCheck(curtinID)
    const [showAccessDeniedMessage, setShowAccessDeniedMessage] = useState(JSON.parse(localStorage.getItem('showAccessDeniedMessage') || "false"))
    const { userRole, updateRole } = useGetRoleID(curtinID)
    const classes = useStyles()
    
    
    const handle = async(e) => {


        if(!isWhitelisted)
        {
            setShowAccessDeniedMessage(true);
            localStorage.setItem('showAccessDeniedMessage', JSON.stringify(true))

        } else {

            e.preventDefault()
            //Clear local storage for access denied message
            localStorage.removeItem('showAccessDeniedMessage')

            //Update the users role in the User schema table after getting new assigned role
            const role = userRole
            console.log(role)

            if (role) {
                // Call updateRole with the correct arguments
                await updateRole(curtinID, role);
            }

            const signupSuccessful = await signup(email, password, username, role, curtinID)
    
             if (signupSuccessful) {

                navigate('/verifyemail');
            
               } else {
                console.log("Signup not successful");
              }
        }
       
        
    }


    return (
            <Container maxWidth="xs">
                {showAccessDeniedMessage && (
                    <Alert severity="error">You do not have authorized access. Please contact the admin.</Alert>
                )}
    
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h5" gutterBottom>Sign Up</Typography>
                    
                    <form onSubmit={handle}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Curtin ID"
                            type="text"
                            onChange={(e) => setCurtinID(e.target.value)}
                            value={curtinID}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                            style={{ marginTop: '1em' }}
                        >
                            Sign Up
                        </Button>
                        {error && <Alert severity="error" style={{ marginTop: '1em' }}>{error}</Alert>}
                    </form>
    
                    <Button
                        type="button"
                        fullWidth
                        variant="text"
                        color="default"
                        style={{ marginTop: '1em' }}
                        onClick={() => navigate('/login')}
                    >
                        Already have an account? Log in
                    </Button>
                </Paper>
            </Container>
        )
}

export default Signup

