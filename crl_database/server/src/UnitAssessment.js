import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const UnitAssessmentPage = () => {
  const { unitId } = useParams();
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [assessment, setAssessment] = useState('');
  const [notes, setNotes] = useState('');


  const handleApprove = () => {
    // Perform approval logic and update the server
  };

  const handleDeny = () => {
    // Perform denial logic and update the server
  };

  return (
    <div>
      <h1>Unit Assessment Page</h1>
      {selectedUnit && (
        <div>
          <h2>Selected Unit Information</h2>
          <p>Institution Name: {selectedUnit.institutionName}</p>
          <p>Unit Name: {selectedUnit.unitName}</p>
          <p>Stream: {selectedUnit.stream}</p>
        </div>
      )}
      <div>
        <h2>Unit Outline Document</h2>
        {/* Display unit outline document */}
      </div>
      <div>
        <h2>Curtin Unit Assessment</h2>
        <textarea
          rows="4"
          cols="50"
          value={assessment}
          onChange={(e) => setAssessment(e.target.value)}
          placeholder="Assessment..."
        />
        <button onClick={handleApprove}>Approve</button>
        <button onClick={handleDeny}>Deny</button>
      </div>
      <div>
        <h2>Notes</h2>
        <textarea
          rows="4"
          cols="50"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes..."
        />
        {/* Display notes log */}
      </div>
      <div>
        <button>Save and Submit</button>
      </div>
    </div>
  );
};

export default UnitAssessmentPage;
