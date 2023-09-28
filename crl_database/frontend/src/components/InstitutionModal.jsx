import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const InstitutionModal = ({ user, onClose }) => {
  const [unitName, setUnitName] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [unitCode, setUnitCode] = useState('');

  const handleSave = () => {
    // Add your save functionality here
    // For now, you can just log the values to the console
    console.log('Institution Name:', unitName);
    console.log('Institution Rank:', institutionName);
    console.log('City', unitCode);

    // Close the modal
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

        {/* Title */}
        <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
          Add an Institution
        </Typography>

        <TextField
          label="Institution Name"
          fullWidth
          margin="normal"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          placeholder="Unit Name"
          sx={{ width: '100%', marginBottom: '16px' }} // Adjust the width and margin
        />

        <TextField
          label="Country"
          fullWidth
          margin="normal"
          value={institutionName}
          onChange={(e) => setInstitutionName(e.target.value)}
          placeholder="Institution Name"
          sx={{ width: '100%', marginBottom: '16px' }} // Adjust the width and margin
        />

        <TextField
          label="Institution rank"
          fullWidth
          margin="normal"
          value={unitCode}
          onChange={(e) => setUnitCode(e.target.value)}
          placeholder="Unit Code"
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
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default InstitutionModal;