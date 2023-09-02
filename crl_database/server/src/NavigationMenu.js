import React from 'react';
import './flow.css'; 

class NavigationMenu extends React.Component {
  render() {
    return (
      <div className="nav-menu">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="dashboard.html">Dashboard</a>
          </li>
          <li className="nav-item">
            <a href="institution.html">Institution</a>
          </li>
          <li className="nav-item">
            <a href="unit-list.html">Unit List</a>
          </li>
          <li className="nav-item">
            <a href="Unit_Assessment.html">Unit Assessment</a>
          </li>
          <li className="nav-item">
            <a href="previously-assessed.html">Previously Assessed List</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavigationMenu;

