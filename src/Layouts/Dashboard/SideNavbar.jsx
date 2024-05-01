import React, { useState } from 'react'
import '../index.css'
import {  NavLink } from "react-router-dom";


function SideNavbar() {
    
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <div className={`sidebar bg-slate-700`} style={{ right: sidebarVisible ? "-1px" : "-190px" }}>
      <nav className='d-flex flex-column ' >
        <i className={`fs-4 mr-auto bi ${sidebarVisible ? "bi-three-dots" : "bi-three-dots-vertical"}  text-slate-300 hover:bg-slate-800 rounded-1 px-2`} onClick={toggleSidebar}></i>
          <NavLink className='my-1 flex flex-row justify-between text-white p-2 rounded hover:bg-slate-800   [&.active]:bg-slate-800'  to="/dashboard/List1">
          <span>admin</span>
          <i class="bi bi-person-workspace"></i>
          </NavLink>
          <NavLink className='my-1 flex flex-row justify-between text-white p-2 rounded hover:bg-slate-800   [&.active]:bg-slate-800'  to="/dashboard/List2">
          <span>admin</span>
          <i class="bi bi-person-workspace"></i>
          </NavLink>
      </nav>
    </div>
  )
}

export default SideNavbar
