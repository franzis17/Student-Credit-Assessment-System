import React, { useState } from 'react';
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import {useAuthContext} from "../hooks/useAuthContext.js"

const StudentSearch = ({ open, onClose}) => {

    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const {user} = useAuthContext()


    const handleSearch = async() => {

        //fetch results from MongoDB based on application on searchInput
        //Update the state with the results

        try {
          const response = await fetch(`/assessment/studentSearch?q=${searchInput}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

          const data = await response.json()

          setSearchResults(data)

      } catch (err) {
        console.error("Error fetching search results", err)
      }
    }


    return (

        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="student-search-modal"
            aria-describedby="search-for-students"
        >
        <div style={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%', 
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto', 
        maxHeight: '90%',
        borderRadius: '8px',
        height: '500px'

        }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '1.0rem' }} >
        </Typography>
            <TextField 
              value={searchInput} 
              onChange={(e) => setSearchInput(e.target.value)} 
              placeholder="Search by ID or Name" 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                  e.preventDefault(); 
                }
              }}
            />
        <Button onClick={handleSearch}>Search</Button>
        <List>
          {searchResults.map(student => (
            <ListItem key={student._id}>
              <ListItemText primary={student.name} secondary={student.id} />
            </ListItem>
          ))}
        </List>
      </div>
    </Modal>
        


    )
}

export default StudentSearch