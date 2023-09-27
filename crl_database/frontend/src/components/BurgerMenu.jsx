import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Button,
  IconButton,
  Divider,
  ListItemButton,
  ListItemText,
  Collapse


} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChevronDownIcon from '@mui/icons-material/ExpandMore';
import ChevronUpIcon from '@mui/icons-material/ExpandLess';
import { Link } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigateTo = (route) => {
    toggleDrawer(); // Close the menu when a button is clicked
    navigate(route);
  };

  const [openLists, setOpenLists] = useState(false);

  function handleListItemClick(index) {
    if (index === 1) {
      setOpenLists(!openLists);
    }
  }

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
        <div role="presentation" style={{ width: '250px' }}>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
          <List>
          {['Dashboard','Lists', 'Whitelist'].map((text, index) => (
            <React.Fragment key={text}>
              <ListItem disablePadding>
                {index === 0 ? (
                  <ListItemButton
                    component={Link}
                    to="/dashboard"
                    onClick={toggleDrawer}
                  >
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                ) :  index == 2 ? (
                  <ListItemButton
                  component={Link}
                  to="/whitelist"   // <- Direct to the Whitelist route
                  onClick={toggleDrawer}
                 >
                  <ListItemIcon>
                    <PersonAddIcon/>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
                ) : (
                  <ListItemButton onClick={() => handleListItemClick(index)}>
                    <ListItemIcon>
                      <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenLists(!openLists);
                      }}
                    >
                      {openLists ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </IconButton>
                  </ListItemButton>
                )}
              </ListItem>
              {index === 1 && (
                <Collapse in={openLists} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {['Units', 'Institutions', 'Previously Assessed List'].map((subText) => (
                      <ListItem key={subText} disablePadding>
                        <ListItemButton
                          component={Link}
                          to={`/${subText.toLowerCase().replace(/\s+/g, '')}`}
                          onClick={toggleDrawer}
                        >
                          <ListItemText primary={subText} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}

        </List>
          <Divider />
          <Button
            variant="contained"
            sx={{
              backgroundColor:"#D3494E",
              color:"white",
              width: '100%',
              borderRadius: 0,
              position: 'absolute',
              bottom: 0,
              left: 0,
            }}
            onClick={() => {
              navigateTo('/login');
            }}
          >
            <LockIcon style={{ marginRight: '20px' }} />
            Logout
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default BurgerMenu;
