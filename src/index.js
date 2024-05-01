import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainDashboard from './Layouts/Dashboard/Main';
import MenuManagement from './Components/DashboardCom/MenuManagement';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>home</div>,
  },
  {
    path: "/dashboard/*",
    element: <MainDashboard/>,
    children: [
      {
        path: "menuManagement",
        element: <MenuManagement></MenuManagement>,
        children:[
          {
            path:'add',
            element:<></>,
          }
          ,{
            path:'*',
            element:<div>MMNotfound</div>,
          }
          ,{
            element:<></>,
            index:true
          }
        ]
      },
      {
        path: "List2",
        element: <div>asd</div>,
      },
      {
        path: "*",
        element: <div>Notfound</div>,
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
