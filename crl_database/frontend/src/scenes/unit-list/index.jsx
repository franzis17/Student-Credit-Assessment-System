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
  
  // Use Axios to GET all Units from the backend server
  const retrieveUnits = () => {
    UnitDataService.getAll()
      .then((response) => {
        console.log("Retrieved units: " + response.data);
        setUnits(response.data);
      })
      .catch((err) => {
        console.log(`ERROR when retrieving institutions. \nError: ${err}`);
      });
  };
  
  // Use Axios to add Unit in the DB by POST request
  const handleAddUnit = () => {
    
    // 1. Enter unit details here
    
    // << Creating a Mock "Unit" Object for now >>
    const unitCode = "COMP2008";
    const name = "Mobile Application Development";
    const location = "Bentley";
    const major = "B Comp";
    const notes = "Teaches how to make mobile applications";
    
    // important note: institution will need to be an objectId
    // how to get id? searched from institution list (or somehow
    // get the institution that is currently displaying this list of units and user their "_id")
    const institution = "64e08d6f12f5f27fc10f3dcf";
    
    const unit = {  
      unitCode,
      name,
      location,
      major,
      institution,
      notes
    };
    
    // 2. Pass it to axios to HTTP POST request to backend route
    UnitDataService.addUnit(unit)
      .then((response) => {
        console.log("Successfully added the mock unit in the database");
        retrieveUnits();  // refresh list to display newly added data
      })
      .catch((error) => {
        console.log(
          `ERROR when adding units in the DB.\nError: ${error.response.data.message}`
        );
      });
  };
  
  // Column fields of Units in the DataGrid
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

    // "newSelection" will end being just the id of the unit selected but we want 
    // the whole Unit object itself, so find it in the Array of "Units"
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
    
    {/*  [TESTING] - if a Unit is actually added in the DB  */}
    {/*  TO BE DELETED once other button is done  */}
    <button onClick={handleAddUnit}>
      Add Unit
    </button>

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
