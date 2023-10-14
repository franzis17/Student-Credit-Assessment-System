import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';


const SearchStudent = ({ open, onClose }) => {
  
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();


  const handleSearch = () => {
    const studentInfo = searchVal;
    //console.log(">>> Clicked search button\nstudentInfo =", studentInfo);
    navigate(`/applications/${studentInfo}`);
    onClose();
  };
  
  const handleInputChange = (e) => {
    setSearchVal(e.target.value);
  };
  
  
  const cancelBtnStyle = {
    color: 'red',
  };
  
  const searchBtnStyle = {
    color: 'blue',
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Search student's applications</DialogTitle>
      <DialogContent>
        <TextField
          label="Enter student"
          fullWidth={true}
          variant="outlined"
          value={searchVal}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={cancelBtnStyle}>
          Cancel
        </Button>
        <Button onClick={handleSearch} style={searchBtnStyle}>
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchStudent;
