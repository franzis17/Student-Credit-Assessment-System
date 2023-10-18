import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UnitDataService from "../../services/unit";
import Navbar from "../../components/Navbar";
import AddUnitButton from '../../components/AddUnitButton';
import SimpleButton from "../../components/buttons/SimpleButton";
import '../institution-list/list.css';
import { DataGrid } from '@mui/x-data-grid';

import { useAuthContext } from '../../hooks/useAuthContext';
import DataUtils from "../../utils/dataUtils";

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

  const { user } = useAuthContext();
  const { institutionId } = useParams();

  console.log("institutionId =", institutionId);

  const dataUtils = new DataUtils();
  const navigate = useNavigate();
  
  // State variables
  const [units, setUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [selectedUnitIDs, setSelectedUnitIDs] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // List units or units of an institution
  useEffect(() => {
    console.log("In Unit List, user:\n", user);
    retrieveUnits();
  }, [institutionId]);
  
  const retrieveUnits = () => {
    // List all units in the DB, if an institutionId has not been specified
    if (institutionId === undefined || institutionId === null) {
      retrieveAllUnits();
    }
    // List specific units of an institution, if its id has been specified
    else {
      retrieveUnitsOfInstitution(institutionId);
    }
  };
  
  // Use Axios to GET all Units from the backend server
  const retrieveAllUnits = () => {
    UnitDataService.getAll(user.token)
      .then((response) => {
        const data = response.data;
        console.log("Retrieved units:\n", data);
        
        // replace the null fields with text "NO DATA"
        dataUtils.replaceNullFields(data);
        
        setUnits(data);
      })
      .catch((err) => {
        console.log("ERROR when retrieving units.\nError:", err);
      });
  };
  
  const retrieveUnitsOfInstitution = (id) => {
    UnitDataService.getUnitsOfInstitution(id, user.token)
      .then((response) => {
        const data = response.data;
        console.log("Retrieved units:\n", data);
        
        // replace the null fields of with text "NO DATA"
        dataUtils.replaceNullFields(data);
        
        setUnits(data);
      })
      .catch((err) => {
        console.log("ERROR when retrieving units of a specific institution.\nError:", err);
      });
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
  
  const handleRemoveClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleRemoveConfirm = async () => {
    try {
      console.log("removing, user token =", user.token);
      await UnitDataService.removeMultiple(selectedUnitIDs, user.token);
      setIsDeleteModalOpen(false);
      setSelectedUnitIDs([]);
      retrieveUnits();
    } catch (error) {
      console.error('Error removing units:', error);
    }
  };

  const handleRemoveCancel = () => {
    setIsDeleteModalOpen(false);
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
  ];
  
  // Handle selecting one or more units
  const handleRowSelectionModelChange = (newSelection) => {
    // > "newSelections" are the id's of the units selected but we want the Unit object itself
    // > replace the unit id's with the actual unit objects that are selected
    const selectedUnitObj = newSelection.map((selectedId) => 
      units.find((unit) => unit._id === selectedId)
    );
    setSelectedUnitIDs(newSelection);
    setSelectedUnits(selectedUnitObj);
    console.log("selectedUnitObj = ", selectedUnitObj);

    // add selected units to local storage incase of refresh
    localStorage.setItem('selectedUnits', JSON.stringify(selectedUnitObj));
  };

  const checkUnitsHaveSameInstitution = () => {
    if (selectedUnits.length > 0) {
      const firstUnitInstitutionId = selectedUnits[0].institution._id;
      for (let i = 1; i < selectedUnits.length; i++) {
        if (selectedUnits[i].institution._id !== firstUnitInstitutionId) {
          return false;
        }
      }
      return true;
    }
    return false;
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
};

export default UnitList;
