import React, { createContext, useContext, useState } from 'react';

// 创建上下文
const AppContext = createContext();

// 提供器组件，用于包装整个应用程序，提供状态
export const AppProvider = ({ children }) => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [notes, setNotes] = useState('');

  return (
    <AppContext.Provider
      value={{
        selectedUnit,
        setSelectedUnit,
        approvalStatus,
        setApprovalStatus,
        notes,
        setNotes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 自定义钩子，用于在组件中访问上下文
export const useAppContext = () => {
  return useContext(AppContext);
};
