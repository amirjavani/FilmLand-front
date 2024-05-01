import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainDashboard from './Layouts/Main';
import List from './Components/List';


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
        path: "List1",
        element: <List text={'list1'}></List>,
      },
      {
        path: "List2",
        element: <List text={'list2'}></List>,
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
