import React from 'react'
import ReactDOM from 'react-dom'
import App from './js/components/App.js'
import styles from './css/index.css';
import { BrowserRouter } from "react-router-dom";
const isLoggedIn  = false;
ReactDOM.render(
  <BrowserRouter>
    <App  isLoggedIn={isLoggedIn}/>
  </BrowserRouter>,
  document.getElementById('App')
);
