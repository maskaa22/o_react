import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';
import {HTML} from "./components/html";
import {store} from "./components/reducers";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <HTML/>
            </Router>
        </Provider>
    </React.StrictMode>,

    document.getElementById('root')
);

reportWebVitals();
