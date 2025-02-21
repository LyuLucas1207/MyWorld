import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/index.css';
// import reportWebVitals from './templates/reportWebVitals';
import { RouterProvider } from 'react-router-dom';
// import BrowserRouter from 'react-router-dom';
import BrowserRouter from '../routers/admin_home_router';

const root = ReactDOM.createRoot(document.getElementById('admin_home-root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={BrowserRouter}></RouterProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
