import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchedUnit, setSearchedUnit] = useState('');
  const [notes, setNotes] = useState([]);
  const [changeLog, setChangeLog] = useState([]);
  const [showConditionalButton, setShowConditionalButton] = useState(false);
  const [showPrerequisites, setShowPrerequisites] = useState(false);

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
      <header>
        {/* Add NavigationMenu component here */}
      </header>
      <div className="container">
        <div className="columns">
          <div className="left-column">
            <div className="unit-info">
              <h2>Selected Unit Information</h2>
              <p><strong>Unit:</strong> Programming Fundamentals</p>
              <p><strong>University:</strong> Toyal University of London</p>
              <p><strong>Stream:</strong> Computer Science</p>
              <p><strong>Course:</strong> Bachelor Of Computing</p>
              <p><strong>Unit Outline Document:</strong> <a href="#">View Document</a></p>
            </div>

            <div className="assessor-actions">
              <h2>Assessor Actions</h2>
              <div className="search-bar">
                <input type="text" className="search-input" placeholder="Search for a Curtin unit..." />
                <button className="button" onClick={handleSearch}>Search</button>
              </div>
              <div className="selected-unit">
                <h3>Searched Curtin Unit</h3>
                <p id="searched-unit-info">{searchedUnit}</p>
                {showConditionalButton && (
                  <button className="button secondary conditional-button" onClick={handleShowPrerequisites}>
                    Show Prerequisites
                  </button>
                )}
                <button className="button secondary approve-button conditional" onClick={handleApprove}>Approve</button>
                <button className="button secondary deny-button conditional" onClick={handleDeny}>Deny</button>
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
              {notes.map((note, index) => (
                <p key={index}>{note}</p>
              ))}
            </div>

            <div className="change-log">
              <h2>Change Log</h2>
              <div className="log-container">
                {changeLog.map((entry, index) => (
                  <p key={index}>{entry}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button className="button">Save and Submit</button>
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
