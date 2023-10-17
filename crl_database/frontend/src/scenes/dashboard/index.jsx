import React from 'react'
import { useState, useEffect, useRef} from 'react'
import { LightModeOutlined,
    Menu as MenuIcon,
    Search,
} from "@mui/icons-material";
import FlexBetween from '../../components/FlexBetween';
import { useDispatch} from 'react-redux';
import {
  IconButton, 
  InputBase, 
  useTheme, 
  List,
  ListItem,
  ListItemText,
  Divider} from '@mui/material';
import Navbar from "../../components/Navbar";
import InstitutionDataService from "../../services/institution";
import UnitDataService from "../../services/unit";
import { useNavigate, useLocation} from 'react-router-dom';

import dashboardBackground from '../../assets/dashboard-backdrop.jpg';

import { useAuthContext } from '../../hooks/useAuthContext';


const Dashboard = () => {
  const [totalInstitutions, setTotalInstitutions] = useState([]);
  const [totalUnits, setTotalUnits] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [institutionList, setInstitutionList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState([]);
  const listRef = useRef(null);

  const {user} = useAuthContext();

  // To do after render
  useEffect(() => {
    // getInstitutionCount();
    // getUnitCount();
    getAllInstitutions();


    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setFilteredList([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };

  }, []);

  // const getInstitutionCount = () => {
  //   InstitutionDataService.getCount(user.token)
  //     .then((response) => {
  //       const instCount = response.data;
  //       setTotalInstitutions(instCount);
  //     })
  //     .catch((err) => {
  //       console.log(
  //         `ERROR when retrieving institution's count. \nError: ${err}`
  //       );
  //     });
  // };

  // const getUnitCount = () => {
  //   UnitDataService.getCount(user.token)
  //   .then((response) => {
  //     const unitCount = response.data;
  //     setTotalUnits(unitCount);
  //   })
  //   .catch((err) => {
  //     console.log(
  //       `ERROR when retrieving unit's count. \nError: ${err}`
  //     );
  //   });
  // };


  const getAllInstitutions = () => {
    InstitutionDataService.getAll(user.token)
    .then((response) => {
      const institutions = response.data;
      setInstitutionList(institutions);
    })
      .catch((err) => {
        console.log(
          `ERROR when retrieving all institutions. \nError: ${err}`
        );
    });
  }

  const handleSearchChange = (ev) => {
    const query = ev.target.value ? ev.target.value.toLowerCase() : "";
    console.log("Query:", query);
  
    if (query === "") {
      setFilteredList([]);
      setSelectedInstitution(null);
    } else {
      const filteredList = institutionList.filter((institution) =>
        institution.name.toLowerCase().includes(query)
      );
      setFilteredList(filteredList);
    }
  };
  
  const handleInstitutionClick = (institutionId) => {
    setSelectedInstitution(institutionId);
    navigateToSortedUnitList(institutionId);
  };

  const navigateToSortedUnitList = (institutionId) => {
    console.log("here is the instition id: " + institutionId)
    if (institutionId) {
      //navigate(`/units?institutionId=${institutionId}`);
      navigate(`/units/${institutionId}`);
    }
  };

  const dashboardStyle = {
    background: `url(${dashboardBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    width: '100vw', // 100% of the viewport width
    height: '100vh', // 100% of the viewport height
    position: 'fixed', // Fixed position to cover the entire viewport
    top: 0,
    left: 0,
    overflow: 'auto' // Allow the container to scroll
  };

  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  return (
  <div style={dashboardStyle}>
  <div>
    <div>
      <Navbar />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '9rem' }}>
    <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
      Welcome to the CRL Database, {user.username}
    </div>
    <FlexBetween backgroundColor={theme.palette.background.alt} borderRadius="10px" gap="0.5rem" p="0.1rem 1rem" style={{ position: 'relative', backgroundColor:"white", border:"solid", borderColor:"#D3D3D3" }}>
          <InputBase
              type="text"
              placeholder="Search an institution to get started..."
              style={{ width: '500px', padding: "0"}}
              onChange={(event) => handleSearchChange(event)}
            />
            <IconButton>
              <Search />
            </IconButton>
            {filteredList.length > 0 && (
              <List
                component="ul"
                ref={listRef}
                style={{
                  marginTop: "0",
                  alignItems: "left",
                  textAlign: 'left',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  position: 'absolute',
                  zIndex: 1,
                  backgroundColor: "white",
                  padding: "0",
                  top: 'calc(100%)',
                  borderLeft:"solid",
                  borderLeftColor:"#D3D3D3",
                  borderRight:"solid",
                  borderRightColor:"#D3D3D3",
                  borderBottomRightRadius:"10px",
                  borderBottomLeftRadius:"10px",
                  borderBottom:"solid",
                  borderBottomColor: "#D3D3D3",
                  width : "95%"
                }}
              >
                {filteredList.map((institution, index) => (
                  <React.Fragment key={institution.id}>
                    <ListItem
                      button
                      onClick={(event) => {
                        handleInstitutionClick(institution._id);
                      }}
                    >
                      <ListItemText primary={institution.name} />
                    </ListItem>

                    {index < 7 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </FlexBetween>
    </div>
  </div>
</div>

  )}
export default Dashboard;
