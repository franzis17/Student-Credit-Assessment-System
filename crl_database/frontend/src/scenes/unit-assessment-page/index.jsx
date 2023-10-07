import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './App.css';
import './buttonStyles.css';

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
  const navigate = useNavigate();
  const location = useLocation();

  // Provide fallback so if state is undefined, it can handle blank units or get from local storage
  const { selectedUnits: initialSelectedUnits } = location.state || { selectedUnits: JSON.parse(localStorage.getItem('selectedUnits') || '[]') }

  const [lastClickedButton, setLastClickedButton] = useState(
    localStorage.getItem('lastClickedButton') || null
  );

  const [lastClickedButtonInfo, setLastClickedButtonInfo] = useState(
    JSON.parse(localStorage.getItem('lastClickedButtonInfo')) || null
  );
  
  const [lastNoteInput, setLastNoteInput] = useState(
    localStorage.getItem('lastNoteInput') || ''
  );

  useEffect(() => {
    localStorage.setItem('lastClickedButton', lastClickedButton);
  }, [lastClickedButton]);

  useEffect(() => {
    return () => {
      localStorage.removeItem('selectedItemDetails');
      localStorage.removeItem('lastClickedButtonInfo');
      localStorage.removeItem('lastNoteInput');
    };
  }, []);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  
  }, []);

  useEffect(() => {
    if (initialSelectedUnits && initialSelectedUnits.length > 0) {
      setSelectedUnits(initialSelectedUnits);
    }

    setNotes(JSON.parse(localStorage.getItem('notes')) || []);
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

  useEffect(() => {
    if (lastNoteInput) {
      localStorage.setItem('lastNoteInput', lastNoteInput);
    }
  }, [lastNoteInput]);
  
  
  const retrieveCurtinUnits = () => {
    InstitutionDataService.getUnitsOfCurtin()
      .then((response) => {
        console.log("Retrieved Curtin Units: " + response.data);
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
      setLastNoteInput(noteText);

      const updatedNotes = [...notes, noteText];
      setNotes(updatedNotes);
  
      localStorage.setItem('notes', JSON.stringify(updatedNotes));

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
      setLastClickedButton("Approve");
      const buttonInfo = {
        button: "Approve",
        unitCode: selectedItemDetails.unitCode,
        unitName: selectedItemDetails.name,
      };
      setLastClickedButtonInfo(buttonInfo);
      localStorage.setItem('lastClickedButtonInfo', JSON.stringify(buttonInfo));
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
      setLastClickedButton("Conditional");
      const buttonInfo = {
        button: "Conditional",
        unitCode: selectedItemDetails.unitCode,
        unitName: selectedItemDetails.name,
      };
      setLastClickedButtonInfo(buttonInfo);
      localStorage.setItem('lastClickedButtonInfo', JSON.stringify(buttonInfo));
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
      setLastClickedButton("Deny");
      const buttonInfo = {
        button: "Deny",
        unitCode: selectedItemDetails.unitCode,
        unitName: selectedItemDetails.name,
      };
      setLastClickedButtonInfo(buttonInfo);
      localStorage.setItem('lastClickedButtonInfo', JSON.stringify(buttonInfo));
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

  const handleStudentInfoSubmit = () => {
    if (studentInfo.name.trim() !== '') {
      console.log('Student Info:', studentInfo);
      navigate('/units');
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
                    <td>{unit.institution}</td>
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
                {selectedItemDetails ? (
                  <p id="searched-unit-info">
                    {selectedItemDetails.unitCode} - {selectedItemDetails.name}
                  </p>
                ) : (
                  <p id="searched-unit-info">No unit selected</p>
                )}
                <div>
                  <button className={`button approve ${searchedUnit ? '' : ''}`} onClick={handleApprove}>Approve</button>
                  <button className={`button conditional ${searchedUnit ? '' : ''}`} onClick={handleConditional}>Conditional</button>
                  <button className={`button deny ${searchedUnit ? '' : ''}`} onClick={handleDeny}>Deny</button>
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
            <h2>Last Note Input</h2>
            {lastNoteInput ? (
              <p>{lastNoteInput}</p>
            ) : (
              <p>No note added yet.</p>
            )}
          </div>

            <div className="change-log">
              <h2>Last Clicked Button</h2>
              {lastClickedButtonInfo ? (
                <p>
                  {lastClickedButtonInfo.button} - {lastClickedButtonInfo.unitCode} - {lastClickedButtonInfo.unitName}
                </p>
              ) : (
                <p>No button clicked yet.</p>
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