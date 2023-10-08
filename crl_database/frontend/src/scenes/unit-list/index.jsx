import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UnitDataService from "../../services/unit";
import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import DataUtils from "../../utils/dataUtils";

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import SimpleButton from "../../components/buttons/SimpleButton";


const UnitList = () => {
  
  // State variables
  const [units, setUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  
  const { user } = useAuthContext();
  
  const dataUtils = new DataUtils();
  
  // To do after render
  useEffect(() => {
    console.log("In Unit List, user:\n", user);
    retrieveUnits();
  }, []);
  
  // Use Axios to GET all Units from the backend server
  const retrieveUnits = () => {
    UnitDataService.getAll(user.token)
      .then((response) => {
        const data = response.data;
        
        console.log("Retrieved units:\n", data);
        
        // replace the null fields of with text "NO DATA"
        dataUtils.replaceNullFields(data);
        
        setUnits(data);
      })
      .catch((err) => {
        console.log(`ERROR when retrieving units. \nError: ${err}`);
      });
  };

  // Use Axios to add Unit in the DB by POST request
  const handleAddUnit = () => {
    
    // 1. Enter unit details here
    
    // << Creating a Mock "Unit" Object for now >>
    const unitCode = "CITS1001";
    const name = "Software Engineering with Java";
    const location = "Perth";
    const major = "B-COMP";
    const notes = "TEST very Long, very long, very long, very long, very long, very long";
    
    // important note: institution will need to be an objectId
    // how to get id? searched from institution list (or somehow
    // get the institution that is currently displaying this list of units and user their "_id")
    const institution = "64e0911b123bc76c05356445";  // UWA
    
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
          `ERROR when adding units.\nError: ${error.response.data.error}`
        );
        window.alert("Error: Cannot add a unit, " + error.response.data.error);
      });
  };
  
  const handleDeleteUnit = () => {
    try {
      var unitID;
      
      selectedUnits.forEach((unit) => {
        unitID = unit._id;
      });
      
      console.log("Unit to delete:", unitID);
      
      if (selectedUnits.length === 0) {
        window.alert("ERROR: Must select at least one unit to delete.");
        throw Error("Must select at least one unit to delete.");
      }
      
      // UnitDataService.deleteUnit(unitID, user.token)
      //   .then((response) => {
      //     console.log("Successfully deleted units.");
      //     retrieveUnits();
      //   })
      //   .catch((error) => {
      //     console.log(
      //       `ERROR when deleting units.\nError: ${error.response.data.error}`
      //     );
      //   });
    } catch (error) {
      console.error("ERROR when deleting units:\n", error);
    }
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
      valueGetter: (params) => {
        if (params.row.institution.toString().includes("NO DATA")) {
          return "NO DATA";
        } else {
          return params.row.institution.name;
        }
      },
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
    console.log("Selected a unit, updated selectedUnitObj to:\n", selectedUnitObj);
    
    // add selected units to local storage incase of refresh
    localStorage.setItem('selectedUnits', JSON.stringify(selectedUnitObj));
  };
  
  

  return (
    <>
    <div>
      <Navbar />
    </div>
    
    { /* FOR TESTING - Add/Delete Unit Buttons */ }
    <SimpleButton content="Add Unit" onClick={handleAddUnit} />
    
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link
        to="/unitassessmentpage"
        state={{ selectedUnits: selectedUnits }}
      >
        <SimpleButton content="Assess" />
      </Link>
      <Button
        variant="contained"
        sx={
          {
            color: 'white', borderRadius: '10px', background: '#24a0ed',
            marginRight: '10px',
          }
        }
        onClick={handleDeleteUnit}
      >
        Delete
      </Button>
    </div>
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
