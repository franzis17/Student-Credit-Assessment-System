import React, { useState, useEffect } from 'react';
import { Link , useLocation} from 'react-router-dom';
import InstitutionDataService from '../../services/institution';
import UnitDataService from "../../services/unit";
import Navbar from "../../components/Navbar";
import AddUnitButton from '../../components/AddUnitButton';
import { DataGrid } from '@mui/x-data-grid';

import { useAuthContext } from '../../hooks/useAuthContext';

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';


const UnitList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const institutionId = queryParams.get('institutionId');
  const [institutionList, setInstitutionList] = useState([]);
  console.log("passed the institution id to UnitList " + institutionId)

  const { user } = useAuthContext();

  // State variables
  const [units, setUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [unitData, setUnitData] = useState(null);

  const [selectedUnitIDs, setSelectedUnitIDs] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // To do after render
  useEffect(() => {
    fetchInstitutions();
    retrieveUnits();
  }, [institutionId])

  const handleRemoveClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleRemoveConfirm = async () => {
    try {
      await UnitDataService.removeMultiple(selectedUnitIDs, user.token);
      setIsDeleteModalOpen(false);
      setSelectedUnitIDs([]);
      retrieveUnits();
    } catch (error) {
      console.error('Error removing units:', error);
    }
  };;

  const handleRemoveCancel = () => {
    setIsDeleteModalOpen(false);
  };

  // Use Axios to GET all Units from the backend server
  const retrieveUnits = () => {
    console.log('Retrieving units for institutionId: ', institutionId);

    const params = {};
    if (institutionId) {
      params.institutionId = institutionId;
    }

    console.log("right before it is passed to the backend " + institutionId);
    const dataServiceMethod = institutionId
      ? UnitDataService.getUnitsOfAnInstitution
      : UnitDataService.getAll;

    dataServiceMethod(params.institutionId, user.token)
      .then((response) => {
        console.log("Response from server:", response.data);
        const unitsWithInstitutionNames = response.data.map((unit) => {
          return {
            ...unit,
            institution: unit.institution ? unit.institution.name : '',
          };
        });

        console.log("Retrieved units:", unitsWithInstitutionNames);
        setUnits(unitsWithInstitutionNames);
      })
      .catch((err) => {
        console.log(`ERROR when retrieving units. \nError: ${err}`);
      });
  };

  const fetchInstitutions = async () => {
    try {
      const response = await InstitutionDataService.getAll(user.token);
      if (Array.isArray(response)) {
        setInstitutionList(response);
      } else {
        console.error('Response is not an array:', response);
      }
    } catch (error) {
      console.error('Error fetching institutions:', error);
    }
  };

  const handleUnitSave = (unitData) => {
    console.log('Received unit data:', unitData);
    UnitDataService.addUnit(unitData, user.token)
      .then((response) => {
        console.log("Successfully added the unit in the database");
        retrieveUnits();
      })
      .catch((error) => {
        console.log(
          `ERROR when adding unit in the DB.\nError: ${error.response.data.message}`
        );
      });
  };

  // Column fields of Units in the DataGrid
  const columns = [
    { field: 'unitCode', headerName: 'Unit Code', width: 150 },
    { field: 'name', headerName: 'Name', width: 350 },
    { field: 'location', headerName: 'Location', width: 300 },
    { field: 'major', headerName: 'Major', width: 150 },
    { field: 'institution', headerName: 'Institution', width: 250 },
    { field: 'notes', headerName: 'Notes', width: 400 }
  ];

  // Handle selecting one or more units
  const handleRowSelectionModelChange = (newSelection) => {
    const selectedUnitObj = newSelection.map((selectedId) => 
      units.find((unit) => unit._id === selectedId)
    );
    setSelectedUnitIDs(newSelection);
    setSelectedUnits(selectedUnitObj);
    console.log("selectedUnitObj = ", selectedUnitObj);
  };

  return (
    <>
      <div>
        <Navbar />
        <AddUnitButton onUnitSave={handleUnitSave}/>
       
        {selectedUnitIDs.length > 0 && (
          <Button
            sx={{
              position: 'absolute',
              top: '15px',
              right: '290px',
              color: 'white',
              borderRadius: '10px',
              background: 'error',
              zIndex: 1200,
            }}
            variant="contained"
            color="error"
            onClick={handleRemoveClick}
          >
            Remove ({selectedUnitIDs.length})
          </Button>
        )}
      </div>

      <Link 
        to="/unitassessmentpage"
        state={{ selectedUnits: selectedUnits }}
      >
        <button>Assess</button>
      </Link>

      {/* [TESTING] - if a Unit is actually added in the DB */}
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

      <Dialog
        open={isDeleteModalOpen}
        onClose={handleRemoveCancel}
        aria-labelledby="remove-dialog-title"
        aria-describedby="remove-dialog-description"
      >
        <DialogTitle id="remove-dialog-title">Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText id="remove-dialog-description">
            Are you sure you want to remove {selectedUnitIDs.length} selected unit(s)?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveCancel} sx={{color:"black"}}>
            Cancel
          </Button>
          <Button onClick={handleRemoveConfirm} color="error">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UnitList;