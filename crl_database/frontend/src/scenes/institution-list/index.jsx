import React, { useState, useEffect } from 'react';
import InstitutionDataService from "../../services/institution";
import Navbar from "../../components/Navbar";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import AddInstitutionButton from '../../components/AddInstitutionButton';

const InstitutionList = () => {
  
  // State variables
  const [institutions, setInstitutions] = useState([]);
  
  // To do after render
  useEffect(() => {
    retrieveInstitutions();  // After rendering, retrieve institutions
  }, []);
  
  
  // Use data service to get all institutions from the backend server
  const retrieveInstitutions = () => {
    InstitutionDataService.getAll()
      .then((response) => {
        console.log("Retrieved institutions: " + response.data);
        setInstitutions(response.data);
      })
      .catch((err) => {
        console.log(
          `ERROR when retrieving institutions. \nError: ${err}`
        );
      });
  };
  
  // Use Axios to add new Institution in the DB by HTTP POST request
  const handleInstitutionSave = (institutionData) => {
    console.log("Received Institution Data: " + institutionData.name);
  
    InstitutionDataService.addInstitution(institutionData)
      .then((response) => {
        console.log(`Successfully added institution in the database.`);
        retrieveInstitutions();
      })
      .catch((error) => {
        if (error.response) {
          console.log(
            `Error Response Data: ${JSON.stringify(error.response.data)}`
          );
          console.log(`Error Status: ${error.response.status}`);
          console.log(`Error Headers: ${JSON.stringify(error.response.headers)}`);
        } else if (error.request) {
          console.log(`No Response Received. Error Request: ${error.request}`);
        } else {
          console.log(`Error Message: ${error.message}`);
        }
        console.error("An error occurred while adding the institution:", error);
      });
  };
  
  const handleDeleteClick = () => {

  }
  
  
  const columns = [
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'rank', headerName: 'Rank' },
    { field: 'location', headerName: 'Location', width: 300 },
    { field: 'major', headerName: 'Major', width: 150 },
    { field: 'notes', headerName: 'Notes', width: 400 },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <IconButton
          style={{ color: '#DB6A6C' }}
          onClick={() => handleDeleteClick(params.row._id)}
          
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  
  
  
  return (
    <>
    <div>
      <Navbar />
      <AddInstitutionButton onInstitutionSave={handleInstitutionSave}/>
    </div>
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
