import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, Avatar } from '@mui/material';
import { QuestionMarkRounded, SettingsOutlined } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';

const SettingsDropDown = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-controls="settings-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SettingsOutlined sx={{ fontSize: '25px' }} />
      </IconButton>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
           handleClose()
           }}>
          <ListItemIcon>
          </ListItemIcon>
          Preferences
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SettingsDropDown;