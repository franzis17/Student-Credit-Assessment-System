import React, { useState, useEffect } from 'react';
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import {useAuthContext} from "../hooks/useAuthContext.js"

const StudentSearch = ({ open, onClose}) => {

    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [suggestedResults, setSuggestedResults] = useState([])
    const [showExtraInfo, setShowExtraInfo] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);
    const {user} = useAuthContext()

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

     const handleListItemClick = (student) => {
      setSelectedCase(student.studentNotes);
      setSuggestedResults([]);
      setSelectedCase(null); // ensure no case is selected when displaying notes
    }


    const handleSearch = async() => {

        //fetch results from MongoDB based on application on searchInput
        //Update the state with the results

        try {
          const response = await fetch(`http://localhost:5001/applications/studentSearch?q=${searchInput}`, {
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


    const extractNote = (note) => {

        if (!note) return { id: null, note: null }

        const idMatch = note.match(/(\d{8})/)
  

        return {
          id: idMatch ? idMatch[1] : null,
          note: note
      }
  }



    return (
      <>
      <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="student-search-modal"
          aria-describedby="search-for-students"
          maxWidth="xs"
          fullWidth
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
              height: '500px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
          }}>
              <Button 
                  style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#3169c3', color: 'white'}}
                  onClick={() => setShowExtraInfo(true)}
              >
                  Extra Info
              </Button>

              <TextField 
                  value={searchInput} 
                  onChange={(e) => setSearchInput(e.target.value)} 
                  placeholder="Search by ID or Name" 
              />

              <div style={{ border: '1px solid #aaa', maxHeight: '150px', overflowY: 'auto' }}>
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
                          {student.studentNotes}
                      </ListItem>
                  ))}
              </div>

              {/* Displaying selected student's notes */}
              {selectedCase && (
              <div style={{ marginTop: '20px' }}>
                <Typography variant="h4">
                  {selectedCase.studentNotes}
                </Typography>
              </div>
             )}

              <List>
                  {searchResults.map(student => {
                      if (student && student.studentNotes) {
                          const { id, note } = extractNote(student.studentNotes);
                          return (
                              <ListItem key={student._id}>
                                  <div>
                                      {id && <Typography variant="h6">ID: {id}</Typography>}
                                      <Typography variant="body1">Note: {note}</Typography>
                                  </div>
                              </ListItem>
                          );
                      }
                      return null;
                  })}
              </List>
          </div>
      </Modal>

      <Modal
          open={showExtraInfo}
          onClose={() => setShowExtraInfo(false)}
          aria-labelledby="selected-case-modal"
          aria-describedby="details-of-selected-case"
      >
          <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '40%',
              height: 'auto',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: '20px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
          }}>
              {selectedCase && (
                  <>
                      <Typography variant="h2" style={{ color: 'white', marginBottom: '15px' }}>
                          Assessed Units:
                          <ul>
                              {selectedCase.assessedUnits.map((unit, index) => (
                                  <li key={index}>{unit.name}</li>
                              ))}
                          </ul>
                      </Typography>
                      <Typography variant="h2" style={{ color: 'white', marginBottom: '15px' }}>
                          Assessor: {selectedCase.assessor}
                      </Typography>
          
                  </>
              )}
          </div>
      </Modal>
  </>
);
}
    
export default StudentSearch