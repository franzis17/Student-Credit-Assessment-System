import React, { useState, useEffect } from 'react';
import { Link , useLocation} from 'react-router-dom';
import InstitutionDataService from '../../services/institution';
import UnitDataService from "../../services/unit";
import Navbar from "../../components/Navbar";
import AddUnitButton from '../../components/AddUnitButton';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const UnitList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const institutionId = queryParams.get('institutionId');
  const [institutionList, setInstitutionList] = useState([]);
  console.log("passed the institution id to UnitList " + institutionId)

  // State variables
  const [units, setUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [unitData, setUnitData] = useState(null);

  // To do after render
  useEffect(() => {
    fetchInstitutions();
    retrieveUnits();
  }, [institutionId]);

  // Use Axios to GET all Units from the backend server
  const retrieveUnits = () => {
    // Get the institutionId from the query parameter
    console.log('Retrieving units for institutionId: ', institutionId);

    const params = {};
    if (institutionId) {
      params.institutionId = institutionId; // Use the correct parameter name
    }

    console.log("right before it is passed to the backend " + institutionId);
    const dataServiceMethod = institutionId
      ? UnitDataService.getUnitsOfAnInstitution // Use 'getUnitsOfAnInstitution' method
      : UnitDataService.getAll; // Use 'getAll' method

    dataServiceMethod(params.institutionId)
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
      const response = await InstitutionDataService.getAll();
      if (Array.isArray(response)) {
        setInstitutionList(response);
      } else {
        console.error('Response is not an array:', response);
      }
    } catch (error) {
      console.error('Error fetching institutions:', error);
    }
  };

  // Use Axios to add Unit in the DB by POST request
  const handleUnitSave = (unitData) => {
    console.log('Received unit data:', unitData);
    UnitDataService.addUnit(unitData)
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
        <AddUnitButton onUnitSave={handleUnitSave}/>
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
    </>
  );
};

export default UnitList;