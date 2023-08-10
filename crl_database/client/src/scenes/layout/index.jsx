import React, { useState } from 'react';
import { Box, useMediaQuery }  from "@mui/material";
import { Outlet } from '@mui/icons-material';
import { useSelector } from "react-redux";
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar'




const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  
  return (
    <Box width="100%" height="100%">
      <Box>
        <Navbar/>
        <Outlet/>
        </Box>
    </Box>
  )}

export default Layout
