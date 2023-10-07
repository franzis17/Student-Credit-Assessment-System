import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext";

const ApplicationList = () => {
  
  // State variables
  const [applications, setApplications] = useState([]);
  
  const { user } = useAuthContext();
  
  useEffect(() => {
    
  }, []);
  
  const retrieveApplications = () => {
    
  };
  
  return (
    <>
    </>
  );
  
};

export default ApplicationList;
