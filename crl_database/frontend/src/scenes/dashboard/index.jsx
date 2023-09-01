import React from 'react'
import { useState } from 'react'
import { Tabs } from "react-ui"
import { LightModeOutlined,  //For darkmode functionality
    DarkModeOutlined, 
    Menu as MenuIcon, 
    SettingsOutlined, 
    ArrowDropDownOutlined, 
    Search
} from "@mui/icons-material";
import FlexBetween from '../../components/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from "../../state"
import { Box, Grid, AppBar, Toolbar, IconButton, InputBase, Button, useTheme} from '@mui/material';
// import BurgerMenu from './BurgerMenu';

const Dashboard = () => {

  const dispatch = useDispatch();
  const theme = useTheme();

  return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '2rem' }}>
  <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
    Welcome to the CRL Database
  </div>
  <div>
      <FlexBetween backgroundColor={theme.palette.background.alt} borderRadius="9px" gap="15rem" p="0.1rem 1.5rem">
        <InputBase placeholder="Search..."/>
        <IconButton>
          <Search />
        </IconButton>
      </FlexBetween>
    </div>
    <Grid container justifyContent="space-between" sx={{ marginTop: '5rem' }}>
        <Grid item xs={4} textAlign="center">
          <b style={{
            fontSize:"20px",
            position:"relative",
            left:"-45px"

          }}>Total CRL Applications</b>
          <Box sx={{ 
                  display:"flex",
                  flexDirection: 'column', // Arrange children vertically
                  justifyContent: 'center', // Center vertically
                  width: ["100%", '200px', '300px'], 
                  height: "100px",
                  alignItems: "center",
                  borderRadius: "15px",
                  backgroundColor: "#D3D3D3",
                  margin: '0 auto', // Center the box horizontally
                  marginTop:"5px"
                  }}>
      Put Total CRL Applications Here
    </Box>
          <div>
            <Button style={{
                     color: '#0070E0',
                     padding: "8px 10px",
                     fontSize: "10px",
                     position: 'relative', // Position relative to the container
                     bottom: '0', // Aligned to the bottom
                     left: '-85px' // Aligned to the left
                    }}>
            View All Applications</Button>
          </div>
        </Grid>
        <Grid item xs={4} textAlign="center">
        <b style={{
            fontSize:"19px",
            position:"relative",
            left:"-15px"

          }}>Applications in Last 24 hours</b>
          <Box sx={{ 
                  display:"flex",
                  flexDirection: 'column', // Arrange children vertically
                  justifyContent: 'center', // Center vertically
                  width: ["100%", '200px', '300px'], 
                  height: "100px",
                  alignItems: "center",
                  borderRadius: "15px",
                  backgroundColor: "#D3D3D3",
                  margin: '0 auto', // Center the box horizontally
                  marginTop:"5px"
                  }}>
      Put Previous 24 Hour Applications Here
    </Box>
          <div>
            <Button style={{
                     color: '#0070E0',
                     padding: "8px 10px",
                     fontSize: "10px",
                     position: 'relative', // Position relative to the container
                     bottom: '0', // Aligned to the bottom
                     left: '-85px' // Aligned to the left
                    }}>
            View new applications</Button>
          </div>
        </Grid>
        <Grid item xs={4} textAlign="center">
        <b style={{
            fontSize:"19px",
            position:"relative",
            left:"-5px"

          }}>Currently Pending Applications</b>
          <Box sx={{ 
                  display:"flex",
                  flexDirection: 'column', // Arrange children vertically
                  alignItems: 'center', // Center horizontally
                  justifyContent: 'center', // Center vertically
                  width: ["100%", '200px', '300px'], 
                  height: "100px",
                  borderRadius: "15px",
                  backgroundColor: "#D3D3D3",
                  margin: '0 auto', // Center the box horizontally
                  marginTop:"5px"
                  }}>
      Put number of pending applications here
    </Box>
          <div>
            <Button style={{
                     color: '#0070E0',
                     padding: "8px 10px",
                     fontSize: "10px",
                     position: 'relative', // Position relative to the container
                     bottom: '0', // Aligned to the bottom
                     left: '-70px' // Aligned to the left
                    }}>
            View pending applications</Button>
          </div>
        </Grid>
        <div style={{ marginTop: '15rem' }} />
        <Grid item xs={4} textAlign="center">
        <b style={{
            fontSize:"19px",
            position:"relative",
            left:"-20px"

          }}>Total Accepted Applications</b>
          <Box sx={{ 
                  display:"flex",
                  flexDirection: 'column', // Arrange children vertically
                  alignItems: 'center', // Center horizontally
                  justifyContent: 'center', // Center vertically
                  width: ["100%", '200px', '300px'], 
                  height: "100px",
                  borderRadius: "15px",
                  backgroundColor: "#D3D3D3",
                  margin: '0 auto', // Center the box horizontally
                  marginTop:"5px"
                  }}>
      Put Total Accepted Applications Here
    </Box>
          <div>
            <Button style={{
                     color: '#0070E0',
                     padding: "8px 10px",
                     fontSize: "10px",
                     position: 'relative', // Position relative to the container
                     bottom: '0', // Aligned to the bottom
                     left: '-70px' // Aligned to the left
                    }}>
            View Accepted Applications</Button>
          </div>
        </Grid>
        <Grid item xs={4} textAlign="center">
        <b style={{
            fontSize:"19px",
            position:"relative",
            left:"-25px"

          }}>Total Rejected Applications</b>
          <Box sx={{ 
                  display:"flex",
                  flexDirection: 'column', // Arrange children vertically
                  alignItems: 'center', // Center horizontally
                  justifyContent: 'center', // Center vertically
                  width: ["100%", '200px', '300px'], 
                  height: "100px",
                  borderRadius: "15px",
                  backgroundColor: "#D3D3D3",
                  margin: '0 auto', // Center the box horizontally
                  marginTop:"5px"
                  }}>
      Put Total Rejected Applications Here
    </Box>
          <div>
            <Button style={{
                     color: '#0070E0',
                     padding: "8px 10px",
                     fontSize: "10px",
                     position: 'relative', // Position relative to the container
                     bottom: '0', // Aligned to the bottom
                     left: '-70px' // Aligned to the left
                    }}>
            View Rejected Applications</Button>
          </div>
        </Grid>
        <Grid item xs={4} textAlign="center">
        <b style={{
            fontSize:"19px",
            position:"relative",
            left:"-20px"

          }}>Total Registered Institutions</b>
          <Box sx={{ 
                  display:"flex",
                  flexDirection: 'column', // Arrange children vertically
                  alignItems: 'center', // Center horizontally
                  justifyContent: 'center', // Center vertically
                  width: ["100%", '200px', '300px'], 
                  height: "100px",
                  borderRadius: "15px",
                  backgroundColor: "#D3D3D3",
                  margin: '0 auto', // Center the box horizontally
                  marginTop:"5px"
                  }}>
      Put Number of Institutions Here
    </Box>
          <div>
            <Button style={{
                     color: '#0070E0',
                     padding: "8px 10px",
                     fontSize: "10px",
                     position: 'relative', // Position relative to the container
                     bottom: '0', // Aligned to the bottom
                     left: '-100px' // Aligned to the left
                    }}>
            View Institutions</Button>
          </div>
        </Grid>
      </Grid>
  </div>

  ) 
}

export default Dashboard
