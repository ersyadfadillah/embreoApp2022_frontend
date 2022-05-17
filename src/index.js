import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bulma/css/bulma.css";
import axios from 'axios';
axios.defaults.withCredentials=true;

// ReactDOM.render(
//   <React.StrictMode>
//     <App/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
