import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import AppProvider from './context/ContextProvider';
import './index.css';
import App from './App';

ReactDOM.render(

<BrowserRouter>
    <AppProvider>
        <App />
    </AppProvider>
</BrowserRouter>    
, document.getElementById('root'));

