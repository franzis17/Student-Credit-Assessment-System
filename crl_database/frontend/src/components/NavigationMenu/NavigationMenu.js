import React from 'react';
import './flow.css'; 
import { Link } from "react-router-dom";

class NavigationMenu extends React.Component {
  render() {
    return (
      <div className="nav-menu">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to={{ pathname: "/dashboard" }}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to={{ pathname: "/institutions" }}>
              Institution
            </Link>
          </li>
          <li className="nav-item">
            <a href="unit-list.html">Unit List</a>
          </li>
          <li className="nav-item">
            <Link to={{ pathname: "/unitassessmentpage" }}>
              Unit Assessment
            </Link>
            
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

