import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigateTo = (route) => {
    toggleDrawer(); // Close the drawer when a button is clicked
    navigate(route);
  };

  const list = (
    <div
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <IconButton onClick={toggleDrawer}>
        <CloseIcon />
      </IconButton>
      <List>
        {["Dashboard", "Unit List", "Institutions", "Previously Assessed List"].map((text, index) => (
          <ListItem key={text} style={{ padding: '8px 0', background: 'none' }}>
            <ListItemIcon>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "275px", borderRadius: 0 }}
                onClick={() => navigateTo(`/${text.replace(/ /g, '').toLowerCase()}`)}
              >
                {text}
              </Button>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button
        variant="contained"
        color="error" // You can use your red color here
        style={{ width: "275px", borderRadius: 0, marginTop: "400px" }}
        onClick={() => {
          navigateTo('/login') //THiS DOESN"T ACTUALLY LOG YOU OUT
        }}
      >
        Logout
      </Button>
    </div>
  );

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        style={{ width: '400px' }}
      >
        {list}
      </Drawer>
    </>
  );
};

export default BurgerMenu;