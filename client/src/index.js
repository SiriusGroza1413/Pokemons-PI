import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";   //4 IMPORTO EL PROVIDER 
import { store } from "./redux/store/index" //5 IMPORTO LA STORE EN SI PARA PODER "ANEXARLA" A REACT

ReactDOM.render( // 6 ACA ES DONDE SE HACE LA CONEXION ENTRE REACT Y REDU, A TRAVES DEL PROVIDER, APUNTANDO A LA STORE QUE USARE
  <Provider store={store}>  
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
