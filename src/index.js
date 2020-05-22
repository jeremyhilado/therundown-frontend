import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import 'mdbreact/dist/css/free/mdb.css'
import './assets/scss/mdb-free.scss'
import {Browserrouter as Router} from 'react-router-dom'


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);


