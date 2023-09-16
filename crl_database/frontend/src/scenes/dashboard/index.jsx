import React from 'react'
import { useState, useEffect} from 'react'
import { LightModeOutlined,  //For darkmode functionality later
    DarkModeOutlined, 
    Menu as MenuIcon,
    Search
} from "@mui/icons-material";
import FlexBetween from '../../components/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from "../../state" //For darkmode functionality later
import { Box, Grid, IconButton, InputBase, Button, useTheme} from '@mui/material';
import Navbar from "../../components/Navbar";
import InstitutionDataService from "../../services/institution";
import UnitDataService from "../../services/institution";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [totalInstitutions, setTotalInstitutions] = useState([]);
  const [totalUnits, setTotalUnits] = useState([]);
  
  // To do after render
  useEffect(() => {
    getInstitutionCount();
    getUnitCount(); // After rendering, retrieve institutions
  }, []);

  const getInstitutionCount = () => {
    InstitutionDataService.getAll()
      .then((response) => {
        const institutions = response.data;
        const count = institutions.length;
        console.log("Total institutions: " + count);
        setTotalInstitutions(count);
      })
      .catch((err) => {
        console.log(
          `ERROR when retrieving institutions. \nError: ${err}`
        );
      });
  };

  const getUnitCount = () => {
    UnitDataService.getAll()
    .then((response) => {
      const units = response.data;
      const count = units.length;
      console.log("Total institutions: " + count);
      setTotalUnits(count);
    })
    .catch((err) => {
      console.log(
        `ERROR when retrieving institutions. \nError: ${err}`
      );
    });
  }

  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
  <div>
    <div>
      <Navbar />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '2rem' }}>
    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
      Welcome to the CRL Database
    </div>
    <div>
        <FlexBetween backgroundColor={theme.palette.background.alt} borderRadius="10px" gap="1rem" p="0.1rem 1rem">
          <InputBase placeholder="Search..." sx={{width:"500px"}}/>
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
      </div>
      <Grid container justifyContent="space-between" sx={{ marginTop: '5rem' }}>
          <Grid item xs={4} textAlign="center">
            <b style={{
              fontSize:"19px",
              position:"relative",
              left:"-60px"

            }}>Total Mapped Units</b>
            <Box sx={{ 
                    display:"flex",
                    flexDirection: 'column', // Arrange children vertically
                    justifyContent: 'center', // Center vertically
                    width: ["100%", '200px', '300px'], 
                    height: "100px",
                    alignItems: "center",
                    borderRadius: "15px",
                    backgroundColor: "#D3D3D3",
                    margin: '0 auto', // Center the box horizontally
                    marginTop:"5px"
                    }}onClick={() => navigate('/unitlist')}>
                    <div style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                    }}> {totalUnits}
                    </div>
      </Box>
            <div>
              <Button style={{
                       color: '#0070E0',
                       padding: "8px 10px",
                       fontSize: "10px",
                       position: 'relative', // Position relative to the container
                       bottom: '0', // Aligned to the bottom
                       left: '-105px' // Aligned to the left

                       
                      }}
                      onClick={() => navigate('/unitlist')}>
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
                    flexDirection: 'column', // Arrange children vertically
                    justifyContent: 'center', // Center vertically
                    width: ["100%", '200px', '300px'], 
                    height: "100px",
                    alignItems: "center",
                    borderRadius: "15px",
                    backgroundColor: "#D3D3D3",
                    margin: '0 auto', // Center the box horizontally
                    marginTop:"5px"
                    }}>
        Put Total Monthly Cases Here
      </Box>
            <div>
              <Button style={{
                       color: '#0070E0',
                       padding: "8px 10px",
                       fontSize: "10px",
                       position: 'relative', // Position relative to the container
                       bottom: '0', // Aligned to the bottom
                       left: '-105px' // Aligned to the left
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
                    flexDirection: 'column', // Arrange children vertically
                    alignItems: 'center', // Center horizontally
                    justifyContent: 'center', // Center vertically
                    width: ["100%", '200px', '300px'], 
                    height: "100px",
                    borderRadius: "15px",
                    backgroundColor: "#D3D3D3",
                    margin: '0 auto', // Center the box horizontally
                    marginTop:"5px"
                    }}>
        Put number of Conditional Status Units Here
      </Box>
            <div>
              <Button style={{
                       color: '#0070E0',
                       padding: "8px 10px",
                       fontSize: "10px",
                       position: 'relative', // Position relative to the container
                       bottom: '0', // Aligned to the bottom
                       left: '-60px' // Aligned to the left
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
                    flexDirection: 'column', // Arrange children vertically
                    alignItems: 'center', // Center horizontally
                    justifyContent: 'center', // Center vertically
                    width: ["100%", '200px', '300px'], 
                    height: "100px",
                    borderRadius: "15px",
                    backgroundColor: "#D3D3D3",
                    margin: '0 auto', // Center the box horizontally
                    marginTop:"5px"
                    }}>Put Total Unmapped Units Here
        </Box>
            <div>
              <Button style={{
                       color: '#0070E0',
                       padding: "8px 10px",
                       fontSize: "10px",
                       position: 'relative', // Position relative to the container
                       bottom: '0', // Aligned to the bottom
                       left: '-85px' // Aligned to the left
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
                    flexDirection: 'column', // Arrange children vertically
                    alignItems: 'center', // Center horizontally
                    justifyContent: 'center', // Center vertically
                    width: ["100%", '200px', '300px'], 
                    height: "100px",
                    borderRadius: "15px",
                    backgroundColor: "#D3D3D3",
                    margin: '0 auto', // Center the box horizontally
                    marginTop:"5px"
                    }}>
        Put Total Rejected Unit Comparisons Here
      </Box>
            <div>
              <Button style={{
                       color: '#0070E0',
                       padding: "8px 10px",
                       fontSize: "10px",
                       position: 'relative', // Position relative to the container
                       bottom: '0', // Aligned to the bottom
                       left: '-70px' // Aligned to the left
                      }}>
              View Rejected Comparisons</Button>
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
                    flexDirection: 'column', // Arrange children vertically
                    alignItems: 'center', // Center horizontally
                    justifyContent: 'center', // Center vertically
                    width: ["100%", '200px', '300px'], 
                    height: "100px",
                    borderRadius: "15px",
                    backgroundColor: "#D3D3D3",
                    margin: '0 auto', // Center the box horizontally
                    marginTop:"5px"
                    }}onClick={() => navigate('/institutions')}>
                       <div style={{ // Add styles to the text element
                          fontSize: "18px", // Set the font size
                          fontWeight: "bold", // Set the font weight
                           // Set the text color
                         }}
                         > {totalInstitutions}
                      </div>
      </Box>
            <div>
              <Button style={{
                       color: '#0070E0',
                       padding: "8px 10px",
                       fontSize: "10px",
                       position: 'relative', // Position relative to the container
                       bottom: '0', // Aligned to the bottom
                       left: '-100px' // Aligned to the left
                      }}onClick={() => navigate('/institutions')}>
              View Institutions</Button>
            </div>
          </Grid>
        </Grid>
    </div>
  </div>
  

  ) 
}

export default Dashboard
