import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import './styles/style.scss';
import 'react-toastify/dist/ReactToastify.css';
import "nouislider/distribute/nouislider.css";
import axios from 'axios';
    
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

ReactDOM.render(
  <React.StrictMode>
    <Routes />
    <ToastContainer position="top-center" />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
