import React, { useState } from 'react';
import { Box, useMediaQuery }  from "@mui/material";
import { Outlet } from '@mui/icons-material';
import { useSelector } from "react-redux";
import Navbar from '../../components/Navbar';
import Dashboard from '../dashboard';




const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  
  return (
    <div>
      <Navbar/>
      <Dashboard/>
    </div>
  );
};

export default Layout
