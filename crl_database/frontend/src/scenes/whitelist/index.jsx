import { useState } from 'react';
import { TextField, Button, Select, MenuItem, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@material-ui/core';
import useStyles from './whitelistPageStyle.js'
import { useFetchWhitelistedUsers } from '../../hooks/useFetchWhitelistedUsers.js';
import { useEffect } from 'react';
import Navbar from '../../components/Navbar.jsx';
import Typography from '@mui/material/Typography';


const Whitelist = () => {

    const [curtinID, setCurtinID] = useState('')
    const [userRole, setUserRole] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { whitelistData, loading, error, handleRemove } = useFetchWhitelistedUsers()
    const [data, setData] = useState([])
    const [inputError, setInputError] = useState('')
    const [helperText, setHelperText] = useState('')

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
                        'Content-Type': 'application/json',


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


return (

    <>
    <div>
      <Navbar />
    </div>

    <Box className="classes" boxShadow={3} p={1}>
    <Typography variant="h2">Whitelist a User Account</Typography>

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

    <Select
        value={userRole}
        onChange={(e) => setUserRole(e.target.value)}
        fullWidth
        displayEmpty
        margin="normal"
    >
        <MenuItem value="">
            <em>Select an option</em>
        </MenuItem>
        <MenuItem value="Staff">Staff</MenuItem>
        <MenuItem value="Moderator">Moderator</MenuItem>
    </Select>

    <Button variant="contained" color="primary" disabled={isLoading} onClick={handleWhitelist}>
        Add user to whitelist
    </Button>
  
    {loading ? (
            <p>Loading whitelisted users...</p>
        ) : error ? (
            <p>Error fetching data: {error.message}</p>
        ) : (

    <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="whitelist table">
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
                   <Button variant="contained" color="secondary" onClick={() => handleRemove(row._id)}>Remove</Button>
                 </TableCell>
              </TableRow>
             ))}
         </TableBody>
    </Table>
    </TableContainer>
        )}
    </Box>
   </>
)
}


export default Whitelist


