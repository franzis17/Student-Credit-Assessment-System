import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UnitDataService from "../../services/unit";
import Navbar from "../../components/Navbar";

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const UnitList = () => {
  
  // State variables
  const [units, setUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  
  // To do after render
  useEffect(() => {
    retrieveUnits();
  }, []);
  
  // Use data service to get all Units from the backend server
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
  
  // Handle selecting one or more units
  const handleRowSelectionModelChange = (newSelection) => {

    // newSelection will end being just the id of the unit selected but we want 
    // the whole Unit object itself
    const selectedUnitObj = newSelection.map((selectedId) => 
      units.find((unit) => unit._id === selectedId)
    );

    setSelectedUnits(selectedUnitObj);
    console.log("selectedUnitObj = ", selectedUnitObj);
  };


  return (
    <>

    <div>
      <Navbar />
    </div>
    
    <Link 
      to="/unitassessmentpage"
      state={{ selectedUnits: selectedUnits }}
    >
      <button>Assess</button>
    </Link>

    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={units}
        rowHeight={30}
        columns={columns}
        columnResizable={true}
        getRowId={(row) => row._id}  // use the Unit's mongo ID as the row ID
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
        selectionModel={selectedUnits}
        onRowSelectionModelChange={handleRowSelectionModelChange}
      />
    </Box>
    
    </>
  );

}

export default UnitList;

