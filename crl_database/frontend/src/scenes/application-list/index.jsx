import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";
import ApplicationDataService from "../../services/application";
import DataUtils from "../../utils/dataUtils";

import Navbar from "../../components/Navbar";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const ApplicationList = () => {
  
  // State variables
  const [applications, setApplications] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  
  const { user } = useAuthContext();

  const dataUtils = new DataUtils();
  
  useEffect(() => {
    retrieveApplications();
  }, []);
  
  const retrieveApplications = () => {
    console.log("Getting applications...");
    ApplicationDataService.getAll(user.token)
      .then((response) => {
        const data = response.data;
        console.log("Retrieved applications:\n", data);
        
        // replace the null fields of with text "NO DATA"
        dataUtils.replaceNullFields(data);
        
        setApplications(data);
      })
      .catch((error) => {
        console.log("ERROR: Failed to retrieve applications.\nMore info:", error);
      })
  };
  
  
  // Column fields of Applications in the DataGrid
  const columns = [
    { 
      field: 'institution',    headerName: 'Institution',       width: 250,
      valueGetter: (params) => {
        if (params.row.institution.toString().includes("NO DATA")) {
          return "NO DATA";
        } else {
          return params.row.institution.name;
        }
      },
    },
    { field: 'status',         headerName: 'Status',            width: 70 },
    { field: 'aqf',            headerName: 'AQF',               width: 70 },
    { field: 'location',       headerName: 'Location',          width: 150 },
    { field: 'award',          headerName: 'Award',             width: 200 },
    { field: 'assessor',       headerName: 'Assessor',          width: 100 },
    { 
      field: 'assessedUnits',  headerName: 'Assessed Unit(s)',  width: 400,
      valueGetter: (params) => {
        // Extract the each names and join them with a comma
        const unitNames = params.row.assessedUnits.map((unit) => unit.name).join(', ');
        return unitNames;
      },
    },
    { 
      field: 'curtinUnit',     headerName: 'Curtin Unit',       width: 300,
      valueGetter: (params) => params.row.curtinUnit.name,
    },
    { field: 'assessorNotes',  headerName: 'Assessor Notes',    width: 400 },
  ];
  
  return (
    <>
      <div>
        <Navbar/>
      </div>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={applications}
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
          selectionModel={selectedApplications}
          //onRowSelectionModelChange={handleRowSelectionModelChange}
        />
      </Box>
    </>
  );
  
};

export default ApplicationList;
