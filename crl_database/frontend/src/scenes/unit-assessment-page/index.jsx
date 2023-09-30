import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import './App.css';
import './buttonStyles.css';

function App() {
  const [searchedUnit, setSearchedUnit] = useState('');
  const [notes, setNotes] = useState([]);
  const [changeLog, setChangeLog] = useState([]);
  const [showConditionalButton, setShowConditionalButton] = useState(false);
  const [showPrerequisites, setShowPrerequisites] = useState(false);
  const location = useLocation();
  const selectedUnits = location.state?.selectedUnits || [];

  useEffect(() => {
    if (searchedUnit) {
      setShowConditionalButton(true);
    } else {
      setShowConditionalButton(false);
    }
  }, [searchedUnit]);
  

  const handleSearch = () => {
    const searchInput = document.querySelector('.search-input').value;
    setSearchedUnit(`Searched Curtin Unit: ${searchInput}`);
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
        <div className="columns">
          <div className="left-column">
          <div className="unit-info">
          <h2>Selected Unit Information</h2>
          {selectedUnits.length > 0 ? (
            selectedUnits.map((unit, index) => (
              <div key={index}>
                <p><strong>Unit Code:</strong> {unit.unitCode}</p>
                <p><strong>Name:</strong> {unit.name}</p>
                <p><strong>Location:</strong> {unit.location}</p>
                <p><strong>Major:</strong> {unit.major}</p>
                <p><strong>Institution:</strong> {unit.institution}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>No unit selected</p>
          )}
        </div>
            <div className="assessor-actions">
              <h2>Assessor Actions</h2>
              <div className="search-bar">
                <input type="text" className="search-input" placeholder="Search for a Curtin unit..." />
                <button className="button" onClick={handleSearch}>Search</button>
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
                  Conditional
                  </button>
                  <button className={`button approve ${searchedUnit ? '' : 'hide'}`} onClick={handleApprove}>Approve</button>
                  <button className={`button deny ${searchedUnit ? '' : 'hide'}`} onClick={handleDeny}>Deny</button>
                </div>
              )}
              </div>
            </div>

            <div className="notes-section">
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
}

export default App;


