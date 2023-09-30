/**
 * TO DO:
 * - Unit List needs to be displayed only when the user clicks on an institution
 */

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import UnitDataService from "../../services/unit";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const UnitList = () => {
  const [units, setUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);

  useEffect(() => {
    retrieveUnits();
  }, []);

  const retrieveUnits = () => {
    UnitDataService.getAll()
      .then((response) => {
        setUnits(response.data);
      })
      .catch((err) => {
        console.log(`ERROR when retrieving units. \nError: ${err}`);
      });
  
  };

  const columns = [
    { field: 'unitCode', headerName: 'Unit Code', width: 150 },
    { field: 'name', headerName: 'Name', width: 350 },
    { field: 'location', headerName: 'Location', width: 300 },
    { field: 'major', headerName: 'Major', width: 150 },
    { field: 'institution', headerName: 'Institution', width: 250 },
    { field: 'notes', headerName: 'Notes', width: 400 }
  ];

  const handleUnitSelection = (selection) => {
    setSelectedUnits(selection.selectionModel.map((selectedIdx) => units[selectedIdx]));
  };

  return (
    <>
    <div>
      <Navbar />
    </div>
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={units}
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
        onSelectionModelChange={handleUnitSelection}
      />
      <Link to={{
        pathname: '/unitassessmentpage',
        state: { selectedUnits }
      }}>
        
          <button>View Selected Units</button>

      </Link>
    </Box>

    </>
  );
}

export default UnitList;
