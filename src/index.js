import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainDashboard from "./Layouts/Dashboard/Main";
import MenuManagement from "./Components/DashboardCom/MenuManagement";
import Main from "./Components/MainPage/Main";
import SliderManagement from "./Components/DashboardCom/SliderManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
  {
    path: "/dashboard/*",
    element: <MainDashboard />,
    children: [
      {
        path: "menuManagement",
        element: <MenuManagement></MenuManagement>,
        children: [
          {
            path: "add",
            element: <></>,
          },
          {
            path: ":id",
            element: <></>,
          },
          {
            path: "*",
            element: <div>MMNotfound</div>,
          },
          {
            path: "",
            element: <></>,
          },
        ],
      },
      {
        path: "sliderManagement",
        element: <SliderManagement></SliderManagement>,
        children: [
          {
            path: "add",
            element: <></>,
          },
          {
            path: ":id",
            element: <></>,
          },
          {
            path: "*",
            element: <div>SMNotfound</div>,
          },
          {
            path: "",
            element: <></>,
          },
        ],
      },
      {
        path: "*",
        element: <div>Notfound</div>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <RouterProvider router={router}></RouterProvider>
  
);
