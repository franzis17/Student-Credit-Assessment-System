import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { configureStore } from "@reduxjs/toolkit"
import globalReducer from "./state"
import { Provider } from 'react-redux';
import { AuthContextProvider } from './context/AuthContext.js';

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
  
);

