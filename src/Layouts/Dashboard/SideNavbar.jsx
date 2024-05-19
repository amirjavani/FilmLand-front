import React, { useState } from 'react'
import 'C:/React/main-project/src/index.js'
import {  NavLink } from "react-router-dom";


function SideNavbar(props) {
    
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    props.toggel()
  };
  return (
    <div className={`sidebar bg-slate-700`} style={{ right: sidebarVisible ? "-1px" : "-190px" }}>
      <nav className='d-flex flex-column ' >
        <i className={`fs-4 mr-auto bi ${sidebarVisible ? "bi-three-dots" : "bi-three-dots-vertical"}  text-slate-300 hover:bg-slate-800 rounded-1 px-2`} onClick={toggleSidebar}></i>
          <NavLink className='my-1 flex flex-row justify-between text-white p-2 rounded hover:bg-slate-800   [&.active]:bg-slate-800'  to="/dashboard/menuManagement">
          <span>فهرست سایت</span>
          <i class="bx bx-book-content bx-rotate-180 bx-flip-horizontal fs-5 p-1"></i>
          </NavLink>
          <NavLink className='my-1 flex flex-row justify-between text-white p-2 rounded hover:bg-slate-800   [&.active]:bg-slate-800'  to="/dashboard/sliderManagement">
          <span>سلایدر</span>
          <i class="bx bxs-carousel fs-5 p-1"></i>
          </NavLink>
      </nav>
    </div>
  )
}

export default SideNavbar
