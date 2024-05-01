import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainDashboard from './Layouts/Dashboard/Main';
import List from './Components/DashboardCom/List';
import MenuManagement from './Components/DashboardCom/MenuManagement';


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>home</div>,
  },
  
  {
    path: "/dashboard",
    element: <MainDashboard/>,
    children: [
      {
        path: "menuManagement",
        element: <></>,
      },
      {
        path: "List2",
        element: <></>,
      },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
    
  </React.StrictMode>
);
