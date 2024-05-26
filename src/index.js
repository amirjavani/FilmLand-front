import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import MainDashboard from "./Layouts/Dashboard/Main";
import MenuManagement from "./Components/DashboardCom/MenuManagement";
import Main from "./Layouts/MainPage/Main";
import SliderManagement from "./Components/DashboardCom/SliderManagement";
import MiniBannerManagement from "./Components/DashboardCom/MiniBannerManagement";
import MoviesComponent from "./Components/MainPage/MoviesCom/MoviesComponent";
import Home from "./Components/MainPage/Home";
import Movie from "./Components/MainPage/MoviesCom/Movie";
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path: "",
        element: <Home></Home>,
        index :true
      },
      {
        path: "/movie",
        element: <div className="mt-20 text-white"><Outlet></Outlet></div>,
        children:[
          {
            path: "",
            element: <MoviesComponent></MoviesComponent>,
            index :true
          },
          {
            path: "1",
            element: <Movie></Movie>,
            index :true
          },
        ]
      },
    ]
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
        path: "MiniBannerManagement",
        element: <MiniBannerManagement></MiniBannerManagement>,
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
