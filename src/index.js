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
import MovieManagement from "./Components/DashboardCom/MovieManagement";
import ActorManagement from "./Components/DashboardCom/ActorManagement";
import Register from "./Layouts/Register";
import Login from "./Layouts/Login"
 
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
        element: <div className=" text-white"><Outlet></Outlet></div>,
        children:[
          {
            path: "",
            element: <MoviesComponent></MoviesComponent>,
            index :true
          },
          {
            path: ":id",
            element: <Movie></Movie>
          }
        ]
      }
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
        path: "MovieManagement",
        element: <MovieManagement></MovieManagement>,
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
            path: "episodeManager/:id",
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
        path: "actorManagement",
        element: <ActorManagement></ActorManagement>,
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
  {
    path: "/register",
    element: <Register></Register>,
    index: true
  },
  {
    path: "/login",
    element: <Login></Login>,
    index: true
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <RouterProvider router={router}></RouterProvider>
  
);
