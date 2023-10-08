import React from 'react'
import { useState, useEffect, useRef} from 'react'
import { LightModeOutlined,  //For darkmode functionality later
    DarkModeOutlined, 
    Menu as MenuIcon,
    Search,
    CountertopsRounded
} from "@mui/icons-material";
import FlexBetween from '../../components/FlexBetween';
import { useDispatch} from 'react-redux';
import { setMode } from "../../state" //For darkmode functionality later
import { Box, 
  Grid, 
  IconButton, 
  InputBase, 
  Button, 
  useTheme, 
  List,
  ListItem,
  ListItemText,
  Divider} from '@mui/material';
import Navbar from "../../components/Navbar";
import InstitutionDataService from "../../services/institution";
import UnitDataService from "../../services/unit";
import { useNavigate, useLocation} from 'react-router-dom';
import Counter from './animate/counter';
import dashboardBackground from '../../assets/dashboard-backdrop.jpg';

// Hook Imports
import { useAuthContext } from "../../hooks/useAuthContext";


const Dashboard = () => {
  const [totalInstitutions, setTotalInstitutions] = useState([]);
  const [totalUnits, setTotalUnits] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [institutionList, setInstitutionList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState([]);
  const listRef = useRef(null);
  
  const { user } = useAuthContext();
  
  // To do after render
  useEffect(() => {
    getInstitutionCount();
    getUnitCount(); // After rendering, retrieve institutions
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

  const getInstitutionCount = () => {
    InstitutionDataService.getCount(user.token)
      .then((response) => {
        const instCount = response.data;
        setTotalInstitutions(instCount);
      })
      .catch((err) => {
        console.log(
          `ERROR when retrieving institution's count. \nError: ${err}`
        );
      });
  };

  const getUnitCount = () => {
    UnitDataService.getCount(user.token)
    .then((response) => {
      const unitCount = response.data;
      setTotalUnits(unitCount);
    })
    .catch((err) => {
      console.log(
        `ERROR when retrieving unit's count. \nError: ${err}`
      );
    });
  };


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

  const handleSearchChange = (event, institutionId) => {
    const query = event.target.value.toLowerCase();
    if (query === "") {
      setFilteredList([]);
      setSelectedInstitution(null); // Clear selected institution when input is empty
    } else {
      const filteredList = institutionList.filter((institution) =>
        institution.name.toLowerCase().includes(query)
      );
      setFilteredList(filteredList);
    }
  };


  const navigateToInstitutionList = (institutionId) => {
    navigate(`/institutions/`); //Change this for return route into institution list
  };

  const navigateToSortedUnitList = () => {
    if (selectedInstitution !== null) {
      navigate(`/units?institutionId=${selectedInstitution}`);
    }
  };

  const dashboardStyle = {
    backgroundImage: `url(${dashboardBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  };

  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <div style={dashboardStyle}>
      {/* ... (your existing content) */}
  <div>
    <div>
      <Navbar />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '2rem' }}>
    <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
      Welcome to the CRL Database
    </div>
    <FlexBetween backgroundColor={theme.palette.background.alt} borderRadius="10px" gap="0.5rem" p="0.1rem 1rem" style={{ position: 'relative', backgroundColor:"white", border:"solid", borderColor:"#D3D3D3" }}>
          <InputBase
              type="text"
              placeholder="Search an institution..."
              style={{ width: '500px', padding: "0"}}
              // onChange={(event) => handleSearchChange(event, institution.id)}
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
                      onClick={() => {
                        setSelectedInstitution(institution.id); // Set the selected institution
                        // handleSearchChange(event, institution.id); // Pass the institution ID
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
      <Grid container justifyContent="space-between" sx={{ marginTop: '5rem' }}>
          <Grid item xs={4} textAlign="center">
            <b style={{
              fontSize:"19px",
              position:"relative",
              left:"-60px"

            }}>Total Mapped Units</b>
            <Box sx={{ 
                    display:"flex",
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: ["100%", '200px', '300px'], 
                    height: "100px",
                    alignItems: "center",
                    borderRadius: "15px",
                    backgroundColor: "#D3D3D3",
                    margin: '0 auto',
                    marginTop:"5px"
                    }}onClick={() => navigate('/units')}>
                    <div style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                    }}> <Counter number={totalUnits}/>
                    </div>
      </Box>
            <div>
              <Button style={{
                       color: '#0070E0',
                       padding: "8px 10px",
                       fontSize: "10px",
                       position: 'relative',
                       bottom: '0',
                       left: '-105px'
                      }}
                      onClick={() => navigate('/units')}>
                      View All Units
              </Button>
            </div>
          </Grid>
          <Grid item xs={4} textAlign="center">
          <b style={{
              fontSize:"19px",
              position:"relative",
              left:"-35px"

            }}>Units Listed This Month</b>
            <Box sx={{ 
                    display:"flex",
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: ["100%", '200px', '300px'], 
                    height: "100px",
                    alignItems: "center",
                    borderRadius: "15px",
                    backgroundColor: "#D3D3D3",
                    margin: '0 auto',
                    marginTop:"5px"
                    }}>
        Put Total Monthly Cases Here
      </Box>
            <div>
              <Button style={{
                       color: '#0070E0',
                       padding: "8px 10px",
                       fontSize: "10px",
                       position: 'relative',
                       bottom: '0',
                       left: '-105px'
                      }}>
              View new Cases</Button>
            </div>
          </Grid>
          <Grid item xs={4} textAlign="center">
          <b style={{
              fontSize:"19px",
              position:"relative",
              left:"-35px"

            }}>Conditional Status Units</b>
            <Box sx={{ 
                    display:"flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: ["100%", '200px', '300px'], 
                    height: "100px",
                    borderRadius: "15px",
                    backgroundColor: "#D3D3D3",
                    margin: '0 auto',
                    marginTop:"5px"
                    }}>
        Put number of Conditional Status Units Here
      </Box>
            <div>
              <Button style={{
                       color: '#0070E0',
                       padding: "8px 10px",
                       fontSize: "10px",
                       position: 'relative',
                       bottom: '0',
                       left: '-60px'
                      }}>
              View Conditional Status Units</Button>
            </div>
          </Grid>
          <div style={{ marginTop: '15rem' }} />
          <Grid item xs={4} textAlign="center">
          <b style={{
              fontSize:"19px",
              position:"relative",
              left:"-45px"

            }}>Total Unmapped Units</b>
            <Box sx={{ 
                    display:"flex",
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: ["100%", '200px', '300px'], 
                    height: "100px",
                    borderRadius: "15px",
                    backgroundColor: "#D3D3D3",
                    margin: '0 auto',
                    marginTop:"5px"
                    }}>Put Total Unmapped Units Here
        </Box>
            <div>
              <Button style={{
                       color: '#0070E0',
                       padding: "8px 10px",
                       fontSize: "10px",
                       position: 'relative',
                       bottom: '0', 
                       left: '-85px'
                      }}>
                    View Unmapped Units</Button>
            </div>
          </Grid>
          <Grid item xs={4} textAlign="center">
          <b style={{
              fontSize:"19px",
              position:"relative",
              left:"-15px"

            }}>Total Rejected Comparisons</b>
            <Box sx={{ 
                    display:"flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: ["100%", '200px', '300px'], 
                    height: "100px",
                    borderRadius: "15px",
                    backgroundColor: "#D3D3D3",
                    margin: '0 auto',
                    marginTop:"5px"
                    }}>
        Put Total Rejected Unit Comparisons Here
      </Box>
            <div>
            <Button
              style={{
                color: '#0070E0',
                padding: "8px 10px",
                fontSize: "10px",
                position: 'relative',
                bottom: '0',
                left: '-70px'
              }}
            >
              View Rejected Comparisons
            </Button>
            </div>
          </Grid>
          <Grid item xs={4} textAlign="center">
          <b style={{
              fontSize:"19px",
              position:"relative",
              left:"-20px"

            }}>Total Registered Institutions</b>
            <Box sx={{ 
                    display:"flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: ["100%", '200px', '300px'], 
                    height: "100px",
                    borderRadius: "15px",
                    backgroundColor: "#D3D3D3",
                    margin: '0 auto',
                    marginTop:"5px"
                    }}onClick={() => navigate('/institutions')}>
                       <div style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                         }}
                         > <Counter number={totalInstitutions}/>
                      </div>
      </Box>
            <div>
              <Button style={{
                       color: '#0070E0',
                       padding: "8px 10px",
                       fontSize: "10px",
                       position: 'relative',
                       bottom: '0',
                       left: '-100px'
                      }}onClick={() => navigate('/institutions')}>
              View Institutions</Button>
            </div>
          </Grid>
        </Grid>
    </div>
  </div>
</div>

  )}
export default Dashboard;
