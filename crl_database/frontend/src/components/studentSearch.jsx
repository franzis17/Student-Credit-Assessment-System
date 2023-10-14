import React, { useState, useEffect } from 'react';
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import {useAuthContext} from "../hooks/useAuthContext.js"
import useStyles from "./studentSearchStyles.js
import { useNavigate } from 'react-router-dom';

const StudentSearch = ({ open, onClose}) => {

    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [suggestedResults, setSuggestedResults] = useState([])
   
    navigate = useNavigate()

    const styles = useStyles()

    const {user} = useAuthContext()

    // Make a smooth delay when selecting an item from the search
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        if (searchInput) {
          handleSearch();
        } else {
          setSuggestedResults([]);
        }
      }, 300); 
      return () => clearTimeout(delayDebounceFn);
     }, [searchInput]);

     const handleClick = (student) => {
      setSuggestedResults([]);
      setSelectedCase(null); // ensure no case is selected when displaying notes
      navigate('/unitassessmentpage')
    }


    const handleSearch = async() => {

        //fetch results from MongoDB based on application on searchInput
        //Update the state with the results

        try {
          const response = await fetch(`http://localhost:5001/applications/searchInput?q=${searchInput}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

          const data = await response.json()

          setSuggestedResults(data)

      } catch (err) {
        console.error("Error fetching search results", err)
      }
    }

    return (
      <>
      <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="student-search-modal"
          aria-describedby="search-for-students"
          maxWidth="sm"
          maxHeight="xs"
          fullWidth
      >
        
        
        <TextField 
            
            onChange={(e) => setSearchInput(e.target.value)} 
            placeholder="Search by ID or Name" 
        />

        <Link to="/applications"> 
          <Button variant="contained" onClick={handleSearch} color="primary" style={{ marginLeft: '10px' }}>
              Search
          </Button>
      </Link>

        <div className={styles.resultList}>
            {suggestedResults.map(student => (
            <ListItem 
                key={student._id} 
                button 
                onClick={() => {
                    setSearchInput('');
                    setSelectedCase(student);
                    setSuggestedResults([]); 
                          }}
             >
            <Typography variant="body1" className={styles.noteText}>
                {student.studentNotes}
            </Typography>
            </ListItem>
                  ))}
        </div>

             
      </Modal>

     
  </>
)
}
    
export default StudentSearch
