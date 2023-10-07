import { useState } from 'react';
import { TextField, Select, MenuItem, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@mui/material';
import { Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    } from '@mui/material';
import {Container, Grid } from '@mui/material';
import { Button } from "@mui/material";
import { useFetchWhitelistedUsers } from '../../hooks/useFetchWhitelistedUsers.js';
import { useEffect } from 'react';
import Navbar from '../../components/Navbar.jsx';
import Typography from '@mui/material/Typography';
import {useAuthContext} from '../../hooks/useAuthContext.js'
import useStyles from './whitelistPageStyle.js'


const Whitelist = () => {

    const [curtinID, setCurtinID] = useState('')
    const [userRole, setUserRole] = useState('')
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const { whitelistData, loading, error, handleRemove } = useFetchWhitelistedUsers()
    const [data, setData] = useState([])
    const [inputError, setInputError] = useState('')
    const [helperText, setHelperText] = useState('')
    const {user} = useAuthContext()

    const classes = useStyles()

    useEffect(() => {
        if (Array.isArray(whitelistData)) {
            setData(whitelistData)
        }
      }, [whitelistData])



    const handleInputChange = (e) => {
        const value = e.target.value;
        setCurtinID(value);

        // Validate the CurtinID
        const isValidCurtinID = /^[a-zA-Z]\d{7}$/.test(value);

        if ((!isValidCurtinID) && (value.length !== 8 || isNaN(value))) {
            setInputError(true);
            setHelperText('ID must start with 1 letter followed by 7 numbers and be of length 8');
        } else {
            setInputError(false);
            setHelperText('');
        }
    }


    const handleWhitelist= async () => {

        if(curtinID && userRole)
        {
            setIsLoading(true);

            try {

                const response = await fetch('http://localhost:5001/api/whitelist/addUserID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`
                    },
                    body: JSON.stringify({curtinID, role: userRole}),
     
                });

                if(response.ok) {

                const addedUser = await response.json();
                setData(prevData => [...prevData, addedUser]);
                console.log(addedUser)

                setCurtinID('')
                setUserRole('')
                }
                else {
                    console.error('Failed to add whitelist')
                }
                
            } catch(error) {
                console.error('Error: ', error)
            } finally {
                setIsLoading(false)
            }

        }
    }

    const handleRemoveClick = (id) => {

        setSelectedId(id);
        setOpenDialog(true);

    }

    const proceedRemoval = () => {
        handleRemove(selectedId); 
        setOpenDialog(false);
        setSelectedId(null);
    }


    return (
        <>
        
        <div>
            <Navbar />
        </div>
        <Container maxWidth="md" className={classes.centeredContent}>
        <Box boxShadow={3} p={3} width="100%">
                <Grid container spacing={2} direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h2" align="center">Whitelist a User Account</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="CurtinID"
                            value={curtinID}
                            size="small"
                            onChange={handleInputChange} //Handle curtinID
                            placeholder="Enter the user's Curtin ID..."
                            fullWidth
                            margin="normal"
                            helperText={helperText}
                            error={inputError}    
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Select
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        fullWidth
                        displayEmpty
                        margin="normal">
                       <MenuItem value="">
                           <em>Select an option</em>
                       </MenuItem>
                       <MenuItem value="Staff">Staff</MenuItem>
                       <MenuItem value="Moderator">Moderator</MenuItem>
                   </Select>
                   </Grid>
                    <Grid item xs={12}>
                        <Button 
                            style={{backgroundColor: '#3169c3', color: 'white' }}
                            variant="contained"
                            disabled={isLoading}
                            onClick={handleWhitelist}>
                            Add user to whitelist
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {loading ? (
                            <p>Loading whitelisted users...</p>
                        ) : error ? (
                            <p>Error fetching data: {error.message}</p>
                        ) : (
                            <TableContainer component={Paper}>
                                <Table className={classes.compactTable} size="small" aria-label="whitelist table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Curtin ID</TableCell>
                                            <TableCell align="right">Role</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((row) => (
                                            <TableRow key={row._id}>
                                                <TableCell component="th" scope="row">
                                                    {row.curtinID}
                                                </TableCell>
                                                <TableCell align="right">{row.role}</TableCell>
                                                <TableCell align="right">
                                                    <Button 
                                                    variant="contained" 
                                                    style={{backgroundColor: '#b63536', color: 'white' }}
                                                    onClick={() => handleRemoveClick(row._id)}>Remove</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>

        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Are you sure you want to remove this user?
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => setOpenDialog(false)} style={{backgroundColor: '#3169c3', color: 'white' }}>
            No
        </Button>
        <Button onClick={proceedRemoval} style={{backgroundColor: '#b63536', color: 'white' }}>
            Yes
        </Button>
        </DialogActions>
        </Dialog>

    </>
    )
}
        
        


export default Whitelist;


