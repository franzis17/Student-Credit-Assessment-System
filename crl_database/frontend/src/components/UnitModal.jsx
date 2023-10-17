import React, { useState, useEffect, useRef} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemText } from '@mui/material';
import InstitutionDataService from "../services/institution"
import Divider from '@mui/material/Divider';
import { useAuthContext } from '../hooks/useAuthContext';

const UnitModal = ({ onClose, onUnitSave}) => {
  const [name, setUnitName] = useState('');
  const [institution, setInstitutionName] = useState('');
  const [unitCode, setUnitCode] = useState('');
  const [major, setMajor] = useState('');
  const [location, setLocation] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const listRef = useRef(null);
  const [institutionArray, setInstitutionArray] = useState([]);
  const [institutionID, setInstitutionID] = useState('');
  
  const {user} = useAuthContext();

  useEffect(() => {
    getAllInstitutions();
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setFilteredList([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };

  }, []);

  const handleSave = () => {
    const unitToAdd = {
      unitCode,
      name,
      location,
      institutionID,
      major,
    };
    onUnitSave(unitToAdd);
    onClose();
  };

  const handleSearchChange = (ev) => {
    const query = ev.target.value || ""; 
    setSearchInput(query);
    setInstitutionName(query);
  
    if (query === "") {
      setFilteredList([]);
      setSelectedInstitution(null);
    } else {
      const filteredList = institutionArray.filter((institution) =>
        institution.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredList(filteredList);
    }
  };
  


  const getAllInstitutions = () => {
    InstitutionDataService.getAll(user.token)
    .then((response) => {
      const institutions = response.data;
      setInstitutionArray(institutions);
    })
      .catch((err) => {
        console.log(
          `ERROR when retrieving institutions. \nError: ${err}`
        );
    });
  }

  const handleInstitutionClick = (institutionP) => {
    console.log("selected institution id is: " + institutionP._id);
    const selectedInstitutionObj = institutionArray.find(
      (institution) => institution._id === institutionP._id
    );
  
    if (selectedInstitutionObj) {
      setInstitutionID(selectedInstitutionObj._id);
      setInstitutionName(selectedInstitutionObj.name);
      setLocation(selectedInstitutionObj.location);
    }

    console.log("ID = " + institutionID);
    console.log("NAME = " + name);
    console.log("LOCATION = " + location);
  
    setFilteredList([]);
    setSelectedInstitution(null);
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
          minWidth: 250,
          maxWidth: 400,
          minHeight: 400,
          borderRadius: '10px',
        }}
      >
        {/* Title */}
        <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: '14px' }}>
          Add a Unit
        </Typography>

        <TextField
          label="Unit Code"
          fullWidth
          margin="normal"
          value={unitCode}
          onChange={(e) => setUnitCode(e.target.value)}
          placeholder="Unit Code"
          sx={{ width: '100%', marginBottom: '16px' }}
        />

        <TextField
          label="Unit Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setUnitName(e.target.value)}
          placeholder="Unit Name"
          sx={{ width: '100%', marginBottom: '16px' }}
        />
        <TextField
          label="Location"
          fullWidth
          margin="normal"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          sx={{ width: '100%', marginBottom: '16px' }}
        />

        <TextField
          label="Institution"
          fullWidth
          margin="normal"
          value={institution}
          onChange={(event) => handleSearchChange(event)}
          placeholder="Institution ID will be pasted here on click"
          sx={{
            width: '100%',
            marginBottom: '16px',
            position: 'relative',
            zIndex: 301, //this helps but idk how...
          }}
        />
        {filteredList.length > 0 && (
                <List
                component="ul"
                ref={listRef}
                style={{
                  alignItems: "left",
                  textAlign: 'left',
                  maxHeight: '100px',
                  overflowY: 'auto',
                  position: 'absolute',
                  zIndex: 300,
                  backgroundColor: "white",
                  padding: "0",
                  borderLeft:"solid",
                  borderLeftColor:"#D3D3D3",
                  borderRight:"solid",
                  borderRightColor:"#D3D3D3",
                  borderBottomRightRadius:"10px",
                  borderBottomLeftRadius:"10px",
                  borderBottom:"solid",
                  borderBottomColor: "#D3D3D3",
                  width : "85%"
                }}
              >
                {filteredList.map((institution, index) => (
                  <React.Fragment key={institution}>
                    <ListItem
                      button
                      onClick={() => handleInstitutionClick(institution)}
                    >
                      <ListItemText primary={institution.name} />
                    </ListItem>
                    {index < filteredList.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
        
            )}
        <TextField
          label="Course Major"
          fullWidth
          margin="normal"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          placeholder="Course Major"
          sx={{ width: '100%', marginBottom: '16px' }}
        />

        <Button
          variant="contained"
          sx={{
            width: '100%',
            backgroundColor: '#24a0ed',
            borderRadius: '5px',
            color: 'white',
          }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default UnitModal;
