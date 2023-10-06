import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UnitDataService from "../../services/unit";
import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const UnitList = () => {
  
  // State variables
  const [units, setUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  
  const { user } = useAuthContext();
  
  // To do after render
  useEffect(() => {
    console.log("In Unit List, user = " + JSON.stringify(user));
    retrieveUnits();
  }, []);
  
  // Use Axios to GET all Units from the backend server
  const retrieveUnits = () => {
    UnitDataService.getAll(user.token)
      .then((response) => {
        console.log("Retrieved units: " + JSON.stringify(response.data));
        
        console.log("> Listing each Unit's institution's name:");
        const tempUnits = response.data;
        tempUnits.forEach((unit) => {
          console.log("unit name = " + unit.name + " | institution = " + unit.institution.name);
        });
        
        setUnits(response.data);
      })
      .catch((err) => {
        console.log(`ERROR when retrieving units. \nError: ${err}`);
      });
  };
  
  // Use Axios to add Unit in the DB by POST request
  const handleAddUnit = () => {
    
    // 1. Enter unit details here
    
    // << Creating a Mock "Unit" Object for now >>
    const unitCode = "CITS2200";
    const name = "Data Structures and Algorithms";
    const location = "Perth";
    const major = "B-COMP";
    const notes = "TEST very Long, very long, very long, very long, very long, very long";
    
    // important note: institution will need to be an objectId
    // how to get id? searched from institution list (or somehow
    // get the institution that is currently displaying this list of units and user their "_id")
    const institution = "64e0911b123bc76c05356445";
    
    const unit = {  
      unitCode,
      name,
      location,
      major,
      institution,
      notes
    };
    
    // 2. Pass it to axios to HTTP POST request to backend route
    UnitDataService.addUnit(unit, user.token)
      .then((response) => {
        console.log("Successfully added the mock unit in the database");
        retrieveUnits();  // refresh list to display newly added data
      })
      .catch((error) => {
        console.log(
          `ERROR when adding units in the DB.\nError: ${error.response.data.error}`
        );
        window.alert("Error: Cannot add a unit, " + error.response.data.error);
      });
  };
  
  // Column fields of Units in the DataGrid
  const columns = [
    { field: 'unitCode',    headerName: 'Unit Code',   width: 150 },
    { field: 'name',        headerName: 'Name',        width: 350 },
    { field: 'location',    headerName: 'Location',    width: 300 },
    { field: 'major',       headerName: 'Major',       width: 150 },
    { 
      field: 'institution', headerName: 'Institution', width: 250,
      // map the institution's name
      valueGetter: (params) => params.row.institution.name,
    },
    { field: 'notes',       headerName: 'Notes',       width: 400 }
  ];
  
  // Handle selecting one or more units
  const handleRowSelectionModelChange = (newSelections) => {
    console.log("newSelections = " + newSelections);

    // > "newSelections" are the id's of the units selected but we want the Unit object itself
    // > replace the unit id's with the actual unit objects that are selected
    const selectedUnitObj = newSelections.map((selectedId) => 
      units.find((unit) => unit._id === selectedId)
    );

    setSelectedUnits(selectedUnitObj);
    console.log("Selected a unit, updated selectedUnitObj to:", selectedUnitObj);
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
