import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


if (typeof process.env.REACT_APP_GOOGLE_MAP_API_KEY === 'undefined') {
  throw new Error('Please specify a \'REACT_APP_GOOGLE_MAP_API_KEY\' env var for Google Maps.');
}

if (typeof process.env.REACT_APP_SERVER_BASE_URL === 'undefined') {
  throw new Error('Please specify a \'REACT_APP_SERVER_BASE_URL\' env var for server communication.');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
