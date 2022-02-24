import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux"
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import App from './App';

import './index.css';
import {Header} from "./components/header";
import {store} from "./components/reducers";

ReactDOM.render(
        <React.StrictMode>
    <Provider store={store}>
            <Router>
                <Header/>
                <App />
            </Router>
    </Provider>
        </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
