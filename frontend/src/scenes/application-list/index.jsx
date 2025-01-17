import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import ApplicationDataService from "../../services/application";
import DataUtils from "../../utils/dataUtils";
import '../institution-list/list.css';

import Navbar from "../../components/Navbar";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CustomToolbar from "../../components/CustomToolbar";
import { Button } from '@mui/material';
import { TableCell, Tooltip } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert
} from '@mui/material';

const ApplicationList = () => {
  
  // Fields
  const { user } = useAuthContext();
  const { studentToSearch } = useParams();
  const dataUtils = new DataUtils();
  
  // console.log(">>> In application list");
  // console.log("studentToSearch =", studentToSearch);
  
  // State variables
  const [applications, setApplications] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [openAlert, setAlertOpen] = useState();
  
  useEffect(() => {
    retrieveApplications();
  }, [studentToSearch]);
  
  const retrieveApplications = () => {
    // 1. LIST ALL applications (without searchInput)
    if (!studentToSearch) {
      retrieveAllApplications();
    }
    // 2. LIST STUDENTS' applications (with searchInput)
    else {
      retrieveApplicationsOfStudent(studentToSearch);
    }
  };
  
  const retrieveAllApplications = () => {
    ApplicationDataService.getAll(user.token)
      .then((response) => {
        const data = response.data;
        // console.log("Retrieved all applications:\n", data);
        
        // replace the null fields of with text "NO DATA"
        dataUtils.replaceNullFields(data);
        
        setApplications(data);
      })
      .catch((error) => {
        console.log("ERROR: Failed to retrieve all applications.\nMore info:", error);
      });
  };
  
  const retrieveApplicationsOfStudent = (student) => {
    ApplicationDataService.getApplicationsOfStudent(student, user.token)
      .then((response) => {
        const data = response.data;
        // console.log("Retrieved a student's applications:\n", data);
        
        // replace the null fields of with text "NO DATA"
        dataUtils.replaceNullFields(data);
        
        setApplications(data);
      })
      .catch((error) => {
        console.log("ERROR: Failed to retrieve a student's applications.\nMore info:", error);
      });
  };

  
  const handleRowSelectionModelChange = (newSelection) => {
    // > "newSelections" are the id's of the units selected but we want the Unit object itself
    // > replace the unit id's with the actual unit objects that are selected
    const selectedUnitObj = newSelection.map((selectedId) => 
      applications.find((application) => application._id === selectedId)
    );
    setSelectedApplications(newSelection);

    // add selected units to local storage incase of refresh
    localStorage.setItem('selected Applications', JSON.stringify(selectedApplications));
  };

  // MODAL

  const handleRemoveConfirm = () => {
    if (selectedApplications.length === 0) {
      handleCloseModal();
      return;
    }
    selectedApplications.forEach((selectedId) => {
      ApplicationDataService.removeApplication(selectedId, user.token)
        .then(() => {
          // Handle success, such as updating the UI
          // console.log(`Application ${selectedId} has been deleted.`);
          retrieveApplications();
        })
        .catch((error) => {
          // Handle errors
          console.error(`Error deleting application ${selectedId}: ${error}`);
        });
    });
    setModalOpen(false);
    retrieveApplications();
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
    { 
      field: 'status',         
      headerName: 'Status',      
      width: 70,
      renderCell: (params) => {
        const status = params.row.status;
        let pointColor = 'transparent';
  
        if (status === 0) {
          pointColor = 'red';
        } else if (status === 1) {
          pointColor = 'green';
        } else if (status === 2) {
          pointColor = 'yellow';
        }
  
        return (
          <Tooltip title={`Status: ${status}`}>
            <TableCell align="center">
              <FiberManualRecord style={{ color: pointColor }} />
            </TableCell>
          </Tooltip>
        );
      },
    },
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
        {selectedApplications.length > 0 && (user.role === "Admin" || user.role === "Moderator") && (
          <Button
            sx={{
              position: 'absolute',
              top: '15px',
              right: '180px',
              color: 'white',
              borderRadius: '10px',
              background: 'error',
              zIndex: 1200,
            }}
            variant="contained"
            color="error"
            onClick={handleOpenModal}  // Add this line
          >
            Remove ({selectedApplications.length})
          </Button>
        )}

        {isModalOpen && (
          <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="remove-dialog-title"
          aria-describedby="remove-dialog-description"
        >
          <DialogTitle id="remove-dialog-title">Confirm Removal</DialogTitle>
          <DialogContent>
            <DialogContentText id="remove-dialog-description">
              Are you sure you want to remove {selectedApplications.length} selected application(s)?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} sx={{color:"black"}}>
              Cancel
            </Button>
            <Button onClick={handleRemoveConfirm} color="error">
              Remove
            </Button>
          </DialogActions>
        </Dialog>
        )}
      </div>
      <div>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            sx = {{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#cccccc",
              },
            }}
            slots={{
              toolbar: CustomToolbar,
            }}
            rows={applications}
            rowHeight={30}
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
            selectionModel={selectedApplications}
            onRowSelectionModelChange={handleRowSelectionModelChange}
            className="list-column"
          />
        </Box>
      </div>
    </>
  );
  
};

export default ApplicationList;
