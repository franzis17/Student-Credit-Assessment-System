import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const InstitutionModal = ({ user, onClose, onInstitutionSave}) => {
  const [name, setInstitutionName] = useState('');
  const [rank, setRank] = useState('');
  const [location, setLocation] = useState('');
  const [major, setMajor] = useState('');

  const handleSave = () => {
    const institutionToAdd = {
      name,
      rank,
      location,
      major,
    };
    console.log("Institution to Add: " + institutionToAdd)
    onInstitutionSave(institutionToAdd);
    onClose();
  }

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
          minWidth: 250, // Adjust the minWidth to make it skinnier
          maxWidth: 400, // Add maxWidth to control the maximum width
          minHeight: 400,
          borderRadius: '10px',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
          Add an Institution
        </Typography>

        <TextField
          label="Institution Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setInstitutionName(e.target.value)}
          placeholder="Institution Name"
          sx={{ width: '100%', marginBottom: '16px' }} // Adjust the width and margin
        />

        <TextField
          label="Institution Rank"
          fullWidth
          margin="normal"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          placeholder="Institution Location"
          sx={{ width: '100%', marginBottom: '16px' }} // Adjust the width and margin
        />

        <TextField
          label="Location"
          fullWidth
          margin="normal"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          sx={{ width: '100%', marginBottom: '16px' }} // Adjust the width and margin
        />

        <TextField
          label="Major"
          fullWidth
          margin="normal"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          placeholder="Major"
          sx={{ width: '100%', marginBottom: '16px' }} // Adjust the width and margin
        />

        <Button
          variant="contained"
          sx={{
            width: '100%', // Make the button full width
            backgroundColor: '#24a0ed',
            borderRadius: '5px',
            color:"white"
          }}
          onClick={handleSave}
        >Save
        </Button>
      </Box>
    </Modal>
  );
};

export default InstitutionModal;