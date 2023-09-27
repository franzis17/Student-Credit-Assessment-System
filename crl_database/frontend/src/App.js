import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuthContext } from './hooks/useAuthContext'

import Login from "./scenes/login";
import Signup from "./scenes/signup";
import Dashboard from "./scenes/dashboard";
import InstitutionList from "./scenes/institution-list";
import UnitList from "./scenes/unit-list";
import Whitelist from "./scenes/whitelist";
import VerifyEmail from "./scenes/verifyEmail";
import UnitAssessmentPage from "./scenes/unit-assessment-page";
import Layout from "./scenes/layout";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const {user} = useAuthContext()
  
  //initialising routes for landing page (dashbaord) after sign in 
  return (
    <div className="app">
      <BrowserRouter>
        
        <ThemeProvider theme = {theme}>
          <CssBaseline />
          
              <Routes>
                <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login"/>}/>
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>}/>
                <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>}/>
                <Route path="/whitelist" element={user ? <Whitelist /> : <Navigate to="/login"/>}/>
                <Route path="/verifyemail" element={<VerifyEmail/>}/>
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login"/>}/>
                <Route path="/institutions" element={user ? <InstitutionList/> : <Navigate to="/login"/>}/>
                <Route path="/units" element={user ? <UnitList /> : <Navigate to="/login"/>}/>
                <Route path="/unitassessmentpage" element={user ? <UnitAssessmentPage /> : <Navigate to="/login"/>}/>
              </Routes> 
              
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
