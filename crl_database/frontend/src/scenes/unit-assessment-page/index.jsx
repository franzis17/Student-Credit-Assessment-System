import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './App.css';
import './buttonStyles.css';

import InstitutionDataService from "../../services/institution";
import { useAuthContext } from "../../hooks/useAuthContext";

const UnitAssessmentPage = () => {
  
  const [searchedUnit, setSearchedUnit] = useState('');
  const [notes, setNotes] = useState([]);
  const [changeLog, setChangeLog] = useState([]);
  const [showConditionalButton, setShowConditionalButton] = useState(false);
  const [showPrerequisites, setShowPrerequisites] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [curtinUnits, setCurtinUnits] = useState([]);
  
  const { user } = useAuthContext();

  // Get Selected Units
  const location = useLocation();
  const { selectedUnits } = location.state;
  
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
    setSearchedUnit(`${item.unitCode} - ${item.name}`);
    setSelectedItemIndex(-1);
    setShowSuggestions(false);
  };

  const handleAddNote = () => {
    const noteText = document.querySelector('.notes-section textarea').value;
    if (noteText.trim() !== '') {
      setNotes([...notes, noteText]);
      document.querySelector('.notes-section textarea').value = '';
    }
  };

  const handleApprove = () => {
    const statusSymbol = <span className="status-symbol approval">•</span>;
    const logEntry = (
      <div className="change-log-entry">
        {statusSymbol}
        {searchedUnit} Approved.
      </div>
    );
    setChangeLog([...changeLog, logEntry]);
  };

  const handleConditional = () => {
    const statusSymbol = <span className="status-symbol conditional">•</span>;
    const logEntry = (
      <div className="change-log-entry">
        {statusSymbol}
        {searchedUnit} Conditional.
      </div>
    );
    setChangeLog([...changeLog, logEntry]);
  };

  const handleDeny = () => {
    const statusSymbol = <span className="status-symbol deny">•</span>;
    const logEntry = (
      <div className="change-log-entry">
        {statusSymbol}
        {searchedUnit} Denied.
      </div>
    );
    setChangeLog([...changeLog, logEntry]);
  };

  const handleShowPrerequisites = () => {
    setShowPrerequisites(true);
  };

  const handleClosePrerequisites = () => {
    setShowPrerequisites(false);
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
                  <th>Notes</th>
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
                    <td>{unit.notes}</td>
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
              <div className="selected-unit">
                <h3>Searched Curtin Unit</h3>
                {searchedUnit ? (
                  <p id="searched-unit-info">{searchedUnit}</p>
                ) : (
                  <p id="searched-unit-info">No unit selected</p>
                )}
                {showConditionalButton && (
                  <div>
                    <button className={`button show-prerequisites ${searchedUnit ? '' : 'hide'}`} onClick={handleShowPrerequisites}>
                      Show Prerequisites
                    </button>
                    <button className={`button approve ${searchedUnit ? '' : 'hide'}`} onClick={handleApprove}>Approve</button>
                    <button className={`button conditional ${searchedUnit ? '' : 'hide'}`} onClick={handleConditional}>Conditional</button>
                    <button className={`button deny ${searchedUnit ? '' : 'hide'}`} onClick={handleDeny}>Deny</button>
                  </div>
                )}
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
              {changeLog.length === 0 ? (
                <p>No change log entries available.</p>
              ) : (
                <div className="log-container">
                  {changeLog.map((entry, index) => (
                    <p key={index}>{entry}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="button-container">
          <Link to="/units">
            <button className="button">Save</button>
          </Link>
        </div>
      </div>

      {showPrerequisites && (
        <div className="prerequisites-modal">
          <div className="prerequisites-content">
            <span className="close-button" onClick={handleClosePrerequisites}>&times;</span>
            <h2>Prerequisites for {searchedUnit}</h2>
            {/* Add prerequisite information here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitAssessmentPage;
