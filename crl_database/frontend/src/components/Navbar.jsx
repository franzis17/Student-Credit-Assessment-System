import React, { useState } from 'react'
import { Tabs } from "react-ui"
import { LightModeOutlined, 
    DarkModeOutlined, 
    Menu as MenuIcon, 
    SettingsOutlined, 
    ArrowDropDownOutlined, 
    Search,
    Dashboard
} from "@mui/icons-material";
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from "../state"
import { Box, Grid, AppBar, Toolbar, IconButton, InputBase, Button, useTheme, Avatar} from '@mui/material';
import { Link } from "react-router-dom";

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
        <FlexBetween gap= "5rem">
          <Button style={{
                     color: 'black',
                     fontSize: "13px",
                     marginLeft: "100px"
                     // Position relative to the containe // Aligned to the botto
                    }}>
              <Link to={{ pathname: "/dashboard" }}>Dashboard</Link>
          </Button>
          <Button style={{
                     color: 'black',
                     fontSize: "13px"// Position relative to the containe // Aligned to the botto
                    }}>
              <Link to={{ pathname: "/institutions" }}>Institution List</Link>
          </Button>
          <Button style={{
                     color: 'black',
                     fontSize: "13px"
                     // Position relative to the containe // Aligned to the botto
                    }}>
              {/*TBA<Link to={{ pathname: "/units" }}>Unit List</Link>*/}
              Unit List
          </Button>
          <Button style={{
                     color: 'black',
                     fontSize: "13px"// Position relative to the containe // Aligned to the botto
                    }}> Previously Assessed List
          </Button>
          <Button style={{
                     color: 'black',
                     fontSize: "13px"// Position relative to the containe // Aligned to the botto
                    }}>
            <Link to={{ pathname: "/unitassessmentpage" }}>Unit Assessment Page</Link>
          </Button>
        </FlexBetween>
        {/* Right Side Top Bar */}
        <FlexBetween gap="1.0rem">
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
          <IconButton>
            <Avatar sx={{ height:"30px", width:"30px" }}/>
          </IconButton>
          </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
