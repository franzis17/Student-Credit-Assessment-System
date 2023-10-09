import React, { useState, useEffect } from 'react';
import InstitutionDataService from "../../services/institution";
import UnitDataService from "../../services/unit"
import Navbar from "../../components/Navbar";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import AddInstitutionButton from '../../components/AddInstitutionButton';
import Button from '@mui/material/Button'; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText'; 
import DialogTitle from '@mui/material/DialogTitle';

import { useAuthContext } from '../../hooks/useAuthContext';

const InstitutionList = () => {
  
  // State variables
  const [institutions, setInstitutions] = useState([]);
  const [institutionToDelete, setInstitutionToDelete] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {user} = useAuthContext();

  // To do after render
  useEffect(() => {
    retrieveInstitutions(); 
  }, []);
  
  //modal stuff
  const openConfirmationModal = (institutionId) => {
    setInstitutionToDelete(institutionId);
    setIsDeleteModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteButtonStyle = {
    position: 'relative',
    color: '#DB6A6C',
    width: "100%"
  };

  const containerStyle = {
    display: 'flex', 
    flexDirection: 'column',
    height: '100%'
  }

  const retrieveInstitutions = () => {
    InstitutionDataService.getAll(user.token)
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
  
    InstitutionDataService.addInstitution(institutionData, user.token)
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
  
  const handleDeleteClick = async () => {
    try {
      await InstitutionDataService.removeInstitution(institutionToDelete, user.token);
      console.log(`Successfully removed institution from the database`);
      retrieveInstitutions();
  
      // Remove units of an institution
      const response = await UnitDataService.removeUnitsOfInstitution(institutionToDelete, user.token);
      if (response.data.startsWith('Deleted')) {
        console.log(response.data);
      } else {
        console.log('No units to delete or invalid data received.');
      }
    } catch (error) {
      console.error("An error occurred while removing the institution:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      } else if (error.request) {
        console.log("No response received. Request:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
    }
  };
  
  
  
  
  
  const columns = [
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'rank', headerName: 'Rank' },
    { field: 'location', headerName: 'Location', width: 300 },
    { field: 'major', headerName: 'Major', width: 150 },
    { field: 'notes', headerName: 'Notes', width: 400 },
    {
      field: 'delete',
      headerName: 'Delete',
      width: "100%",
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            style={deleteButtonStyle}
            onClick={() => openConfirmationModal(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  
  
  
  return (
    <div>
      <Navbar />
      <AddInstitutionButton onInstitutionSave={handleInstitutionSave} />

      <div style={containerStyle}>
        <Box sx={{ flex: 1 }}>
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
          />
        </Box>
        <Dialog
          open={isDeleteModalOpen}
          onClose={closeConfirmationModal}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete this institution and all its units?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeConfirmationModal} sx={{ color: '#DB6A6C' }}>
              No
            </Button>
            <Button
              onClick={() => {
                handleDeleteClick();
                closeConfirmationModal();
              }}
              sx={{ color: '#52a832' }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default InstitutionList;