import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useState } from 'react';


// Username:  EMAIL AND CHANGE PASS BUTTON

const UserDetailsModal = ({ onClose }) => {

  const { user } = useAuthContext()
  const [password, setPassword] = useState('');

  const handleChangePassword = () => {

    //Call request to change password - use a route

    console.log("Password changed to:", password);
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
          minWidth: 400,
          minHeight: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3, 
      }}
      >
        <Typography variant="h6" sx ={{ fontSize: '1.5rem', fontWeight: 'bold' }} >User Details</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} > {user?.username}</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} > {user?.email}</Typography>

        <Button
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
            >
            Change Password
        </Button>
        
      </Box>
    </Modal>
  );
};

export default UserDetailsModal;