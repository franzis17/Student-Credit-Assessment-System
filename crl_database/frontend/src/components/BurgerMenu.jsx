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
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChevronDownIcon from '@mui/icons-material/ExpandMore';
import ChevronUpIcon from '@mui/icons-material/ExpandLess';
import { Link } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { useLogout } from '../hooks/useLogout.js'
import SearchStudent from './searchStudent.jsx';
import Whitelist from './whitelistMenu.jsx';

const BurgerMenu = () => {
  
  const [open, setOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [whitelistModalOpen, setWhitelistModalOpen] = useState(false)
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [openLists, setOpenLists] = useState(false);
  const {logout} = useLogout()
  
  //Conditionally set the menu items 
  const menuItems = ['Dashboard', 'Lists']
  //Check if the user is admin
  if (user && user.role == 'Admin') {
    menuItems.push('Whitelist');
    menuItems.push('Search Student');
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigateTo = (route) => {
    toggleDrawer(); // Close the menu when a button is clicked
    navigate(route);
  };

  const toggleSearchModal = () => {
    setSearchModalOpen(!searchModalOpen);
  };

  const toggleWhitelistMenu = () => {
    setWhitelistModalOpen(!whitelistModalOpen)
  }

  const handleLogout = () => {
    // Perform logout action here, e.g., clear authentication tokens, navigate to login page, etc.
    logout()
    navigate('/login')
    // navigate('/login'); // You can uncomment this line if you have a navigation system set up
  };



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
          {menuItems.map((text, index) => (
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
                ) :  index == 2 && user && user.role === 'Admin' ? (
                  <ListItemButton
                  onClick={toggleWhitelistMenu}
                 >
                  <ListItemIcon>
                    <PersonAddIcon/>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
                ) : index == 3 && user && user.role === 'Admin' ? ( 
                    <ListItemButton 
                    onClick={toggleSearchModal}
                    >
                    <ListItemIcon>
                    <PersonSearchIcon />
                    </ListItemIcon>
                   <ListItemText primary="Search student" />
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
                    {['Institutions', 'Units', 'Applications'].map((subText) => (
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
              handleLogout()
            }}
          >
            <LockIcon style={{ marginRight: '20px' }} />
            Logout
          </Button>
        </div>
      </Drawer>
      
      { /* SearchStudent is new one */ }
      <SearchStudent open={searchModalOpen} onClose={toggleSearchModal} />
      
      <Whitelist open={whitelistModalOpen} onClose={toggleWhitelistMenu} />
    </>
  );
};

export default BurgerMenu;
