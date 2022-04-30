import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Permet de connecter l'app à l'url dans le navigateur et de s'en servir partout
import './index.css';

import App from './App';

ReactDOM.render(
  
    <BrowserRouter>
      <App/>
    </BrowserRouter>
   
  ,
  document.getElementById('root')
);
