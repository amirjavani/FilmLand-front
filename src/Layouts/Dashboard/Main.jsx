import React, { useState } from 'react'
import SideNavbar from './SideNavbar'
import Header from './Header'
import { Outlet, Route, Routes } from 'react-router-dom'
import List from '../../Components/DashboardCom/List'
import MenuManagement from '../../Components/DashboardCom/MenuManagement'

function MainDashboard() {
    const [isOpen, setIsOpen] = useState(false);

    function toggel(){
        setIsOpen(!isOpen)
    }
    return (
    <>
        
        <Header></Header>
        <SideNavbar toggel={toggel}></SideNavbar>
        <Outlet></Outlet>
        <div className={`table-wrapper flex flex-col-reverse my-8  ml-10 px-4 `} style={{ transition:' all 0.3s ease',marginRight:isOpen?'260px':'70px'}} >
            <Routes >
                <Route path='/menuManagement' element={<MenuManagement isOpen={isOpen}></MenuManagement>}></Route>
                <Route path='/List2' element={<List text={"List 2"}></List>}></Route>                        
            </Routes>
        </div>
        
    </>
  )
}

export default MainDashboard
