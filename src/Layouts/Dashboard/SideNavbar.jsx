import React, { useState } from "react";
import "../../../src/index";
import { NavLink } from "react-router-dom";

function SideNavbar(props) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    props.toggel();
  };
  return (
    <div
      className={`sidebar bg-slate-700`}
      style={{ right: sidebarVisible ? "-1px" : "-190px" }}>
      <nav className="d-flex flex-column ">
        <i
          className={`fs-4 mr-auto bi ${
            sidebarVisible ? "bi-three-dots" : "bi-three-dots-vertical"
          }  text-slate-300 hover:bg-slate-800 rounded-1 px-2`}
          onClick={toggleSidebar}></i>
        <p className="bg-slate-600 text-white ml-auto p-1 rounded" >صفحه</p>
        <NavLink
          className="my-1 text-[16px] flex flex-row justify-between text-white p-2 rounded hover:bg-slate-800   [&.active]:bg-slate-800"
          to="/dashboard/menuManagement">
          <span>فهرست سایت</span>
          <i class="bx bx-book-content bx-rotate-180 bx-flip-horizontal text-[18px] p-1"></i>
        </NavLink>
        <NavLink
          className="my-1 text-[16px] flex flex-row justify-between text-white p-2 rounded hover:bg-slate-800   [&.active]:bg-slate-800"
          to="/dashboard/sliderManagement">
          <span>سلایدر</span>
          <i class="bx bxs-carousel text-[18px] p-1"></i>
        </NavLink>
        <NavLink
          className="my-1 flex text-[16px] flex-row justify-between text-white p-2 rounded hover:bg-slate-800   [&.active]:bg-slate-800"
          to="/dashboard/MiniBannerManagement">
          <span>مینی بنر</span>
          <i class="bx bx-square-rounded text-[18px] p-1"></i>
        </NavLink>
        <NavLink
          className="my-1 flex text-[16px] flex-row justify-between text-white p-2 rounded hover:bg-slate-800   [&.active]:bg-slate-800"
          to="/dashboard/groupCardsManagement">
          <span>دسته کارت</span>
          <i class="bx bx-columns text-[18px] p-1"></i>
        </NavLink>
        <p className="bg-slate-600 text-white ml-auto p-1 rounded" >فیلم</p>
        <NavLink
          className="my-1 text-[16px] flex flex-row justify-between text-white p-2 rounded hover:bg-slate-800   [&.active]:bg-slate-800"
          to="/dashboard/MovieManagement">
          <span>فیلم ها </span>
          <i class='bx bx-film text-[18px] p-1' ></i>
        </NavLink>
        <NavLink
          className="my-1 text-[16px] flex flex-row justify-between text-white p-2 rounded hover:bg-slate-800   [&.active]:bg-slate-800"
          to="/dashboard/actorManagement">
          <span>بازیگران </span>
          <i class='bx bx-user-circle text-[18px] p-1' ></i>
        </NavLink>
        <p className="bg-slate-600 text-white ml-auto p-1 rounded" >کامنت‌</p>

        <NavLink
          className="my-1 text-[16px] flex flex-row justify-between text-white p-2 rounded hover:bg-slate-800   [&.active]:bg-slate-800"
          to="/dashboard/newCommentsManagement">
          <span>کامنت‌های اخیر </span>
          <i class='bx bx-comment-dots text-[18px] p-1' ></i>
        </NavLink>
        <NavLink
          className="my-1 text-[16px] flex flex-row justify-between text-white p-2 rounded hover:bg-slate-800   [&.active]:bg-slate-800"
          to="/dashboard/suspiciousCommentManagement">
          <span>کامنت‌های مشکوک </span>
          <i class='bx bx-comment-error text-[18px] p-1' ></i>
        </NavLink>
        <br></br>
        <NavLink
          className="my-1 text-[16px] flex flex-row justify-between text-white p-2 rounded hover:bg-slate-800   [&.active]:bg-slate-800"
          to="/dashboard/reports">
          <span>گزارش </span>
          <i class='bx bx-comment-error text-[18px] p-1' ></i>
        </NavLink>
      </nav>
    </div>
  );
}

export default SideNavbar;
