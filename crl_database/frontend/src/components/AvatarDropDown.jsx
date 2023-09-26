import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LockIcon from '@mui/icons-material/Lock';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import UserDetailsModal from './UserDetailsModal'; // Import your UserDetailsModal component

const user = {
  username: 'exampleUser',
  email: 'user@example.com',
  id: '123456',
  avatarUrl: 'https://example.com/avatar.jpg',
};

const AvatarDropDown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    handleClose(); // Close the menu when opening the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    // Perform logout action here, e.g., clear authentication tokens, navigate to login page, etc.
    //clear localStorage and navigate to login page
    localStorage.clear();
    // navigate('/login'); // You can uncomment this line if you have a navigation system set up
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-controls="settings-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar sx={{ height: '30px', width: '30px' }} />
      </IconButton>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          Logout
        </MenuItem>

        <MenuItem onClick={handleOpenModal}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          Account Details
        </MenuItem>
      </Menu>
      
      {openModal && (
        <UserDetailsModal user={user} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AvatarDropDown;