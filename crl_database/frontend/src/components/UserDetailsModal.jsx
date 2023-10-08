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
         minWidth: 350,
          minHeight: 300,
          display: 'flex',
         flexDirection: 'column',
          alignItems: 'center',
          gap: 3, 
          borderRadius: 2,
       }}
     >
        <Box
        sx={{
         width: '100%',
         bgcolor: '#3169c3',
         padding: 2,
         borderRadius: '8px 8px 0 0',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
        }}
       > 
       <Typography
        variant="h6"
       sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', position: 'center' }}
         >Account Details</Typography>
        </Box>

       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
       <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '1.0rem' }} >Username: 
       </Typography>
       <Typography variant="body1"> {user?.username} </Typography>
       </Box>

       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
       <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '1.0rem' }} >Email: 
       </Typography>
       <Typography variant="body1"> {user?.email} </Typography>
       </Box>

       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
       <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '1.0rem' }} >Permissions: 
       </Typography>
       <Typography variant="body1"> {user?.role} </Typography>
       </Box>

       <Button
          variant="contained"
           onClick={handleChangePassword}
           sx={{ marginTop: 2 }}
           >
            Change Password
        </Button>
      
      </Box>
   </Modal>
)
}
export default UserDetailsModal;

/* return (
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
          borderRadius: 2,
      }}
      >
        <Box
        sx={{
          width: '100%',
          bgcolor: blue[500], 
          padding: 2,
          borderRadius: '8px 8px 0 0',
        }}
        > 
        <Typography
            variant="h6"
            sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}
        >   Account Details </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} > Username: {user?.username}</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} > Email: {user?.email}</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} > Permissions: {user?.role}</Typography>

        <Button
            variant="contained"
            color="secondary"
            onClick={handleChangePassword}
            sx={{ marginTop: 2 }}
            >
            Change Password
        </Button>
        
      </Box>
    </Modal>
  );
}; */
