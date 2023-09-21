import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, Avatar } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

const AvatarDropDown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Perform logout action here, e.g., clear authentication tokens, navigate to login page, etc.
    //clear localStorage and navigate to login page
    localStorage.clear();
    navigate('/login');
    handleClose();
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-controls="settings-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar sx={{ height:"30px", width:"30px" }}/>
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
      </Menu>
    </div>
  );
};

export default AvatarDropDown;
