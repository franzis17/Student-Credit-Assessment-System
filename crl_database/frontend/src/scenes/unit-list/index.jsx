/**
 * TO DO:
 * - Unit List needs to be displayed only when the user clicks on an institution
 */

import React, { useState, useEffect } from 'react';
import UnitDataService from "../../services/unit";
import Navbar from "../../components/Navbar";

import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const UnitList = () => {
  
  // State variables
  const [units, setUnits] = useState([]);
  
  // To do after render
  useEffect(() => {
    retrieveUnits();
  }, []);
  
  // Use data service to get all institutions from the backend server
  const retrieveUnits = () => {
    UnitDataService.getAll()
      .then((response) => {
        console.log("Retrieved units: " + response.data);
        setUnits(response.data);
      })
      .catch((err) => {
        console.log(
          `ERROR when retrieving institutions. \nError: ${err}`
        );
      });
  };
  
  // Column fields of Units
  const columns = [
    { field: 'unitCode',    headerName: 'Unit Code',   width: 150 },
    { field: 'name',        headerName: 'Name',        width: 350 },
    { field: 'location',    headerName: 'Location',    width: 300 },
    { field: 'major',       headerName: 'Major',       width: 150 },
    { field: 'institution', headerName: 'Institution', width: 250 },
    // TO DO: Add status here
    { field: 'notes',       headerName: 'Notes',       width: 400 }
  ];

  return (
    <>
    <div>
      <Navbar />
    </div>
    <Box sx={{ height: '100%', width: '100%' }}>
    
      <DataGrid
        rows={units}
        rowHeight={30}
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
        disableRowSelectionOnClick
      />
        
    </Box>
    </>
  );

}

export default UnitList;
