import React, { useState } from 'react'
import { Tabs } from "react-ui"
import { LightModeOutlined, 
    DarkModeOutlined
} from "@mui/icons-material";
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from "../state"
import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, useTheme, Button} from '@mui/material';
import BurgerMenu from './BurgerMenu';
import AvatarDropDown from './AvatarDropDown';
import SettingsDropDown from './SettingsDropdown';

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const currentPage = useLocation();
  const currentState = useState();

  const navbarStyle = {
    position: 'static',
    background: 'none',
    boxShadow: 'none',
    height: '75px',
    // Add any other styles specific to your Navbar component here
  };

  return (
    <AppBar sx={navbarStyle}>
      <AppBar sx={navbarStyle}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left side top bar */}
          <FlexBetween>
            <BurgerMenu />
          </FlexBetween>
          {/* Right Side Top Bar */}
          <FlexBetween gap="1.0rem">
            {/* <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === 'light' ? (
                <DarkModeOutlined sx={{ fontSize: '25px' }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: '25px' }} />
              )}
            </IconButton> */}

            <IconButton>
              <AvatarDropDown/>
            </IconButton>
          </FlexBetween>
        </Toolbar>
      </AppBar>
    </AppBar>
  );
}

export default Navbar;
