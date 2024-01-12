import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';


import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Provider } from 'react-redux';
import store from './Redux/store';



const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 2000,
  offset: '10px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store = {store}> 
  <AlertProvider template={AlertTemplate} {...options}>
  <App />
</AlertProvider>
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
