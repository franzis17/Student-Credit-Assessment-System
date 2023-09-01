import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import InstitutionDataService from "../../services/institution";

const InstitutionList = () => {
  
  // State variables
  const [institutions, setInstitutions] = useState([]);
  
  // To do after render
  useEffect(() => {
    retrieveInstitutions();  // After rendering, retrieve institutions
  }, []);
  
  const retrieveInstitutions = () => {
    // Use data service to get all institutions from the backend server
    InstitutionDataService.getAll()
      .then((response) => {
        console.log("Retrieved institutions: " + response.data);
        setInstitutions(response.data);
      })
      .catch((err) => {
        console.log(
          `ERROR when retrieving institutions,
          file in components/InstitutionList/instituion-list.js. \nError: ${err}`
        );
      });
  };
  
  const columns = [
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'rank', headerName: 'Rank' },
    { field: 'location', headerName: 'Location' },
    { field: 'major', headerName: 'Major' },
    { field: 'notes', headerName: 'Notes', width: 400 }
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={institutions}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );

}

export default InstitutionList;
