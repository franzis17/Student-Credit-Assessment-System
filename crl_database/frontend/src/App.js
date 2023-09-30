import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

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
  
  //initialising routes for landing page (dashbaord) after sign in 
  return (
    <div className="app">
      <BrowserRouter>
        
        <ThemeProvider theme = {theme}>
          <CssBaseline />
          
              <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/whitelist" element={<Whitelist />}/>
                <Route path="/verifyemail" element={<VerifyEmail />}/>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/institutions" element={<InstitutionList/> }/>
                <Route path="/units" element={<UnitList />}/>
                <Route path="/unitassessmentpage" element={<UnitAssessmentPage />}/>
              </Routes> 
              
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
