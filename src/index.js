import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import './index.css';
import App from './App';

ReactDOM.render(

<BrowserRouter>
    <ContextProvider>
        <App />
    </ContextProvider>
</BrowserRouter>    
, document.getElementById('root'));

