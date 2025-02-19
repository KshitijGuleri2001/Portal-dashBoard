import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './components/ThemeContext'
import Background from './components/Background'
import reportWebVitals from './reportWebVitals';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "primereact/resources/themes/saga-blue/theme.css";  // or another theme
import { PrimeReactProvider } from 'primereact/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
       
        <ThemeProvider>
        <PrimeReactProvider>
            <Background>
                <App />
            </Background>
            </PrimeReactProvider>
        </ThemeProvider>
       
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
