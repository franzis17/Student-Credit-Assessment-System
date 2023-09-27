import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const UnitModal = ({ user, onClose }) => {
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
          minWidth: 400,
          minHeight: 300,
        }}
      >
        <Button
          variant="outlined"
          color="error"
          sx={{ position: 'absolute', top: 0, left: 0 }}
          onClick={onClose}
        >
          X
        </Button>
      </Box>
    </Modal>
  );
};

export default UnitModal;