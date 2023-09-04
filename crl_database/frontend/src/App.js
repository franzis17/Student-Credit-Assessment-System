import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./scenes/dashboard";
import InstitutionList from "./components/InstitutionList/institution-list";
import UnitAssessmentPage from "./scenes/unit-assessment-page";
import Layout from "./scenes/layout";
import NavigationMenu from "./components/NavigationMenu/NavigationMenu";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  
  //initialising routes for landing page (dashbaord) after sign in 
  return (
    <div className="app">
      <BrowserRouter>
        <header>
          <NavigationMenu /> {/* Use the NavigationMenu component */}
        </header>
        <ThemeProvider theme = {theme}>
          <CssBaseline />
          <Routes>
            
            <Route path="/" element={<Dashboard />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/institutions" element={<InstitutionList/> }/>
            <Route path="/unitassessmentpage" element={<UnitAssessmentPage />}/>
            
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
