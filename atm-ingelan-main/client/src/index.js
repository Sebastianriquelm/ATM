import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
const info = () => 'SELECT * FROM ATM'; 
console.log(info()); 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

