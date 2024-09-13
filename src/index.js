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
import Register from "./Layouts/MainPage/Register";
import Login from "./Layouts/MainPage/Login";
import Subscription from "./Layouts/MainPage/Subscription";
import Redirect from "./Layouts/MainPage/Redirect";
import CommentManagement from "./Components/DashboardCom/NewCommentManagement";
import NewCommentManagement from "./Components/DashboardCom/NewCommentManagement";
import SuspiciousCommentsManagement from "./Components/DashboardCom/suspiciousCommentManagement";
import GroupCardsManagement from "./Components/DashboardCom/GroupCardsManagement";
import Reports from "./Components/DashboardCom/Reports";
import About from "./Components/MainPage/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [,
      {
        path: "/about",
        element: <About></About>,
        index: true,
      },
      {
        path: "",
        element: <Home></Home>,
        index: true,
      },
      {
        path: "/movies",
        element: (
          <div className=" text-white">
            <Outlet></Outlet>
          </div>
        ),
        children: [
          {
            path: "",
            element: <MoviesComponent></MoviesComponent>,
            index: true,
          },
        ],
      },
      {
        path: "/movie",
        element: (
          <div className=" text-white">
            <Outlet></Outlet>
          </div>
        ),
        children: [
          {
            path: ":id",
            element: <Movie></Movie>,
          },
        ],
      },
    ],
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
        path: "newCommentsManagement",
        element: <NewCommentManagement></NewCommentManagement>,
        children: [
          {
            path: "*",
            element: <div>CMNotfound</div>,
          },
          {
            path: "",
            element: <></>,
          },
        ],
      },
      {
        path: "suspiciousCommentManagement",
        element: <SuspiciousCommentsManagement></SuspiciousCommentsManagement>,
        children: [
          {
            path: "*",
            element: <div>CMNotfound</div>,
          },
          {
            path: "",
            element: <></>,
          },
        ],
      },
      {
        path: "groupCardsManagement",
        element: <GroupCardsManagement></GroupCardsManagement>,
        children: [
          {
            path: "*",
            element: <div>GCM Notfound</div>,
          },
          {
            path: "",
            element: <></>,
          },
        ],
      },
      {
        path: "reports",
        element: <Reports></Reports>,
        children: [
          {
            path: "*",
            element: <div>RCM Notfound</div>,
          },
          {
            path: "",
            element: <></>,
          },
        ],
      },

      {
        path: "*",
        element: (
          <div className="text-[20px] mx-auto  my-10">
            <strong>به پنل ادمین خوش آمدید.</strong>
            <p>از نوار سمت راست برای دسترسی به امکانات استفاده کنید.</p>
          </div>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
    index: true,
  },
  {
    path: "/login",
    element: <Login></Login>,
    index: true,
  },
  {
    path: "/subscription",
    element: <Subscription></Subscription>,
    index: true,
  },
  {
    path: "/redirect",
    element: <Redirect></Redirect>,
    index: true,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);
