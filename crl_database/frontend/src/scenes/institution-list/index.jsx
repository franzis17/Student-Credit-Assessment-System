import React, { useState, useEffect } from 'react';
import InstitutionDataService from "../../services/institution";
import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const InstitutionList = () => {
  
  // State variables
  const [institutions, setInstitutions] = useState([]);
  const { user } = useAuthContext();
  
  // To do after render
  useEffect(() => {
    retrieveInstitutions();  // After rendering, retrieve institutions
  }, []);
  
  
  // Use data service to get all institutions from the backend server
  const retrieveInstitutions = () => {
    InstitutionDataService.getAll(user.token)
      .then((response) => {
        console.log("Retrieved institutions: " + response.data);
        setInstitutions(response.data);
      })
      .catch((err) => {
        console.log(
          `ERROR when retrieving institutions. \nError: ${err}\nError response: ${err.response.data}`
        );
      });
  };
  
  // Use Axios to add new Institution in the DB by HTTP POST request
  const handleAddInstitution = () => {
    
    // 1. Enter institution details
    
    // << Mock new institution >>
    const name = "Australian Data and Cyber Institute";
    const rank = 15;
    const location = "Adelaide Terrace Perth";
    const major = "DATA-CYBER";
    const notes = "More into cyber security and data science";
    
    const newInstitution = { name, rank, location, major, notes };
    
    // 2. Pass newInstitution to axios to HTTP POST request the backend server
    InstitutionDataService.addInstitution(newInstitution, user.token)
      .then((response) => {
        console.log(`Successfully added institution in the database.`);
        retrieveInstitutions();
      })
      .catch((error) => {
        console.log(
          `ERROR when adding institutions in the DB.\n>${error}\n>Error response: ${error.response.data.error}`
        );
        window.alert("Error: Cannot add an institution, " + error.response.data.error);
      });
  };
  
  
  const columns = [
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'rank', headerName: 'Rank' },
    { field: 'location', headerName: 'Location', width: 300 },
    { field: 'major', headerName: 'Major', width: 150 },
    { field: 'notes', headerName: 'Notes', width: 400 }
  ];
  
  
  return (
    <>
    <div>
      <Navbar />
    </div>
    
    {/* [ TESTING ] - if an Institution is actually added in the DB */}
    {/* TO BE DELETED - once the "form" button is done to add the institution */}
    <button onClick={handleAddInstitution}>Add Institution</button>
    
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={institutions}
        columns={columns}
        columnResizable={true}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection
        //disableRowSelectionOnClick
      />
    </Box>
    </>
  );

}

export default InstitutionList;
