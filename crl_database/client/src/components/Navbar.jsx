import React, { useState } from 'react'
import { Tabs } from "react-ui"
import { LightModeOutlined, 
    DarkModeOutlined, 
    Menu as MenuIcon, 
    SettingsOutlined, 
    ArrowDropDownOutlined, 
    Search
} from "@mui/icons-material";
import FlexBetween from '../components/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from "../state"
import { Grid, AppBar, Toolbar, IconButton, InputBase, Button, useTheme} from '@mui/material';
import Sidebar from './Sidebar';

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side top bar */}
        <FlexBetween>
          <IconButton onClick={() => console.log('Side bar open /')}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* Right Side Top Bar */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'light' ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '2rem' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
          Welcome to the CRL Database, Hannes
        </div>
        <div>
            <FlexBetween backgroundColor={theme.palette.background.alt} borderRadius="9px" gap="15rem" p="0.1rem 1.5rem">
              <InputBase placeholder="Search..."/>
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          </div>
      </div>

      {/* Text Containers with Buttons */}
      <Grid container justifyContent="space-between" sx={{ marginTop: '5rem' }}>
        <Grid item xs={4} textAlign="center">
          <div>Text 1</div>
          <div>
            <button>Button 1</button>
          </div>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <div>Text 2</div>
          <div>
            <button>Button 2</button>
          </div>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <div>Text 3</div>
          <div>
            <button>Button 3</button>
          </div>
        </Grid>
        <div style={{ marginTop: '15rem' }} />
        <Grid item xs={4} textAlign="center">
          <div>Text 4</div>
          <div>
            <button>Button 4</button>
          </div>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <div>Text 5</div>
          <div>
            <button>Button 5</button>
          </div>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <div>Text 6</div>
          <div>
            <button>Button 6</button>
          </div>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Navbar;