import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from "react-router-dom";
import {
  Provider,
  KeepAlive,
} from 'react-keep-alive';
import "./assets/css/reset.css";
import "./assets/js/scale"
import 'antd-mobile/dist/antd-mobile.css';
ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
