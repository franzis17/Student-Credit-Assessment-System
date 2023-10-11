import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './App.css';
import './buttonStyles.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import AssessmentDataService from "../../services/assessment";

import InstitutionDataService from "../../services/institution";

const UnitAssessmentPage = () => {
  const [searchedUnit, setSearchedUnit] = useState('');
  const [notes, setNotes] = useState([]);
  const [changeLog, setChangeLog] = useState([]);
  const [showConditionalButton, setShowConditionalButton] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [curtinUnits, setCurtinUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [studentInfo, setStudentInfo] = useState({ name: '', studentNumber: '', studentNote: '',  });
  const [nameError, setNameError] = useState(false);
  const [selectedItemDetails, setSelectedItemDetails] = useState(
    JSON.parse(localStorage.getItem('selectedItemDetails')) || null
  );

  const {user} = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Provide fallback so if state is undefined, it can handle blank units or get from local storage
  const { selectedUnits: initialSelectedUnits } = location.state || { selectedUnits: JSON.parse(localStorage.getItem('selectedUnits') || '[]') }
  const [selectedAction, setSelectedAction] = useState(
    localStorage.getItem('selectedAction') || ''
  );
  const [assessmentData, setAssessmentData] = useState([]);
  const retrieveAssessmentData = async () => {
    try {
      const response = await AssessmentDataService.getAssessmentData(user.token);
      console.log("Retrieved Assessment Data:", response.data);
      setAssessmentData(response.data);
    } catch (err) {
      console.error(`ERROR: when retrieving Assessment Data.\nMore info: ${err}`);
    }
  };

  useEffect(() => {
    retrieveAssessmentData();
  }, []);


  useEffect(() => {
    return () => {
      localStorage.removeItem('selectedItemDetails');
      localStorage.removeItem('selectedAction');
    };
  }, []);


  useEffect(() => {
    if (initialSelectedUnits && initialSelectedUnits.length > 0) {
      setSelectedUnits(initialSelectedUnits);
    }
  }, [initialSelectedUnits]);
  

  // Retrieve all Curtin Units when the user first lands at the Unit Assessment Page.
  // Used by search dropdown to list all the Curtin Units that the user can select.
  useEffect(() => {
    retrieveCurtinUnits();
  }, []);

  useEffect(() => {
    if (searchedUnit) {
      setShowConditionalButton(true);
    } else {
      setShowConditionalButton(false);
    }
  }, [searchedUnit]); 
  
  const retrieveCurtinUnits = () => {
    InstitutionDataService.getUnitsOfCurtin(user.token)
      .then((response) => {
        console.log("Retrieved Curtin Units:", response.data);
        setCurtinUnits(response.data);
      })
      .catch((err) => {
        console.log(`ERROR: when retrieving Curtin's Units.\nMore info: ${err}`);
      });
  };

  const handleSearchInputChange = (event) => {
    const searchInput = event.target.value;

    // Filter the curtinUnits based on the search input (both unit code and name)
    const filteredResults = curtinUnits.filter(item =>
      item.name.toLowerCase().includes(searchInput.toLowerCase()) || // Search by name
      item.unitCode.toLowerCase().includes(searchInput.toLowerCase()) // Search by unit code
    );

    setSearchResults(filteredResults);
    setSearchedUnit(searchInput);

    // Show search suggestions if there are results and input is not empty
    setShowSuggestions(filteredResults.length > 0 && searchInput !== '');
  };

  const handleMouseEnter = (index) => {
    setSelectedItemIndex(index);
  };

  const handleMouseLeave = () => {
    setSelectedItemIndex(-1);
  };

  const handleDatabaseItemClick = (item) => {
    setSelectedItemDetails(item);
    setSearchedUnit(`${item.unitCode} - ${item.name}`);
    setSelectedItemIndex(-1);
    setShowSuggestions(false);

    // Update local storage with the selected item details
    localStorage.setItem('selectedItemDetails', JSON.stringify(item));
  };

  const handleAddNote = () => {
    const noteText = document.querySelector('.notes-section textarea').value;
    if (noteText.trim() !== '') {
      const currentTime = new Date();
      const formattedTime = `${currentTime.getFullYear()}-${
        String(currentTime.getMonth() + 1).padStart(2, '0')
      }-${String(currentTime.getDate()).padStart(2, '0')} ${
        String(currentTime.getHours()).padStart(2, '0')
      }:${String(currentTime.getMinutes()).padStart(2, '0')}`;
      const noteWithTimestamp = `${formattedTime} - ${noteText}`;
  
      const updatedNotes = [...notes, noteWithTimestamp];
      setNotes(updatedNotes);
      document.querySelector('.notes-section textarea').value = '';
    }
  };
  
  const handleApprove = () => {
    if (!selectedItemDetails) {
      alert("Please select a Curtin unit before performing this action.");
    } else {
      const statusSymbol = '•';
      const logEntry = `${statusSymbol} ${selectedItemDetails.unitCode} - ${selectedItemDetails.name} Approved.`;
  
      const updatedChangeLog = [...changeLog, logEntry];
  
      setChangeLog(updatedChangeLog);
      setSelectedAction('Approved'); // Set selected action here
      localStorage.setItem('selectedAction', 'Approved'); // Store selected action in local storage
    }
  };
  
  const handleConditional = () => {
    if (!selectedItemDetails) {
      alert("Please select a Curtin unit before performing this action.");
    } else {
      const statusSymbol = '•';
      const logEntry = `${statusSymbol} ${selectedItemDetails.unitCode} - ${selectedItemDetails.name} Conditional.`;
      const updatedChangeLog = [...changeLog, logEntry];
  
      setChangeLog(updatedChangeLog);
      setSelectedAction('Conditional'); // Set selected action here
      localStorage.setItem('selectedAction', 'Conditional'); // Store selected action in local storage
    }
  };
  
  const handleDeny = () => {
    if (!selectedItemDetails) {
      alert("Please select a Curtin unit before performing this action.");
    } else {
      const statusSymbol = '•';
      const logEntry = `${statusSymbol} ${selectedItemDetails.unitCode} - ${selectedItemDetails.name} Denied.`;
  
      const updatedChangeLog = [...changeLog, logEntry];
  
      setChangeLog(updatedChangeLog);
      setSelectedAction('Denied'); // Set selected action here
      localStorage.setItem('selectedAction', 'Denied'); // Store selected action in local storage
    }
  };
  
  

  const handleSave = () => {
    if (!initialSelectedUnits || initialSelectedUnits.length === 0) {
      alert("No other Unit Information is selected on the Units page");
    } else if (!selectedItemDetails) {
      alert("Please select an action (Deny, Conditional, or Approve) first.");
    } else {
      toggleModal();
    }
  };


  const handleRemoveUnit = (indexToRemove) => {
    const updatedUnits = [...selectedUnits];
    updatedUnits.splice(indexToRemove, 1);
    setSelectedUnits(updatedUnits);
  
    localStorage.setItem('selectedUnits', JSON.stringify(updatedUnits));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleStudentInfoSubmit = async () => {
    if (studentInfo.name.trim() !== '') {
      const assessmentData = {
        status: selectedAction === 'Approve' ? 1 : (selectedAction === 'Deny' ? 2 : 3), // Adjust status based on the selected action
        assessor: user._id, // Use the current user's ID or the appropriate value
        unit: selectedItemDetails._id, // Use the selected unit's ID
        application: selectedUnits.map((unit) => unit.institution._id), // Use the selected unit's institutions' IDs
        noteLog: notes, // Save the notes in the noteLog field
        date: new Date(), // Adjust as needed
        studentNotes: studentInfo.studentNote,
      };
      try {
        // Send the assessment data to the server for saving in the database
        await AssessmentDataService.addAssessment(assessmentData, user.token);

        // After saving, navigate to another page or perform any necessary actions
        navigate('/applications');
      } catch (error) {
        console.error("Error when saving assessment data:", error);
        alert("Error when saving assessment data. Please try again.");
      }
    } else {
      setNameError(true);
      setTimeout(() => {
        setNameError(false);
      }, 5000);
    }
  };
  

return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div className="unit-info">
          <h2>Selected Unit Information</h2>
          {selectedUnits.length > 0 ? (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Unit Code</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Major</th>
                  <th>Institution</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedUnits.map((unit, index) => (
                  <tr key={index}>
                    <td>{unit.unitCode}</td>
                    <td>{unit.name}</td>
                    <td>{unit.location}</td>
                    <td>{unit.major}</td>
                    <td>{unit.institution.name}</td>
                    <td>
                      {selectedUnits.length > 1 && (
                        <button
                          className="remove-button"
                          onClick={() => handleRemoveUnit(index)}
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No unit selected</p>
          )}
        </div>

        <div className="columns">
          <div className="left-column">
            <div className="assessor-actions">
              <h2>Assessor Actions</h2>
              <div className="search-bar">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search for a Curtin unit..."
                  onChange={handleSearchInputChange}
                  value={searchedUnit}
                />
                {showSuggestions && (
                  <div className="search-suggestions">
                    <ul>
                      {searchResults.map((item, index) => (
                        <li
                          key={index}
                          className={`search-result ${index === selectedItemIndex ? 'hovered' : ''}`}
                          onClick={() => handleDatabaseItemClick(item)}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {item.unitCode} - {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="selected-curtin-unit">
              <h3>Searched Curtin Unit</h3>
              <div className="unit-info-frame">
                {selectedItemDetails ? (
                  <p id="searched-unit-info">
                    {selectedItemDetails.unitCode} - {selectedItemDetails.name}
                  </p>
                ) : (
                  <p id="searched-unit-info">No unit selected</p>
                )}
              </div>
              <div className="action-buttons-frame">
                <div>
                  <button className={`button approve ${searchedUnit ? '' : ''}`} onClick={handleApprove}>
                    Approve
                  </button>
                </div>
                <div>
                  <button className={`button conditional ${searchedUnit ? '' : ''}`} onClick={handleConditional}>
                    Conditional
                  </button>
                </div>
                <div>
                  <button className={`button deny ${searchedUnit ? '' : ''}`} onClick={handleDeny}>
                    Deny
                  </button>
                </div>
              </div>
              <div className="selected-action-frame">
                Selected Action: {selectedAction}
              </div>
            </div>

            </div>

            <div className="notes-section assessor-notes">
              <h2>Assessor Notes</h2>
              <textarea rows="4" cols="50" placeholder="Add notes here..." />
              <button className="button" onClick={handleAddNote}>Add Note</button>
            </div>
          </div>

          <div className="right-column">
          <div className="note-log">
            <h2>Notes Log</h2>
            {notes.length === 0 ? (
              <p>No notes available.</p>
            ) : (
              <div className="log-container">
                {notes.map((note, index) => (
                  <p key={index}>{note}</p>
                ))}
              </div>
            )}
          </div>

          <div className="change-log">
            <h2>Change Log</h2>
            {assessmentData.length === 0 ? (
              <p>No change log entries available.</p>
            ) : (
              <div className="log-container">
                {assessmentData.map((entry, index) => (
                  <p key={index}>
                    {`${entry.selectedItemDetails.unitCode} - ${entry.selectedItemDetails.name} ${entry.selectedAction}`}
                  </p>
                ))}
              </div>
            )}
          </div>

          </div>
        </div>

        <div className="button-container">
          <button className="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      {/*{showPrerequisites && (
        <div className="prerequisites-modal">
          <div className="prerequisites-content">
            <span className="close-button" onClick={handleClosePrerequisites}>&times;</span>
            <h2>Prerequisites for {searchedUnit}</h2>
          </div>
        </div>
      )}*/}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2>Enter Student Information</h2>
              <input
                type="text"
                placeholder="Name"
                value={studentInfo.name}
                onChange={(e) => {
                  setStudentInfo({ ...studentInfo, name: e.target.value });
                  setNameError(false);
                }}
              />
              <input
                type="text"
                placeholder="Student Number"
                value={studentInfo.studentNumber}
                onChange={(e) =>
                  setStudentInfo({
                    ...studentInfo,
                    studentNumber: e.target.value,
                  })
                }
              />
              <textarea
                placeholder="Student Note"
                value={studentInfo.studentNote}
                onChange={(e) =>
                  setStudentInfo({
                    ...studentInfo,
                    studentNote: e.target.value,
                  })
                }
              />
              {nameError && (
                <p className="error-message">
                  Name field cannot be empty. Please enter a name.
                </p>
              )}

              <button className="button" onClick={handleStudentInfoSubmit}>
                Submit
              </button>

              <button className="button" onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}  
    </div>
  );
};

export default UnitAssessmentPage;
