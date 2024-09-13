import React, { useState } from 'react'
import SideNavbar from './SideNavbar'
import Header from './Header'
import {  Outlet, Route, Routes } from 'react-router-dom'

function MainDashboard() {
    const [isOpen, setIsOpen] = useState(true);

    function toggel(){
        setIsOpen(!isOpen)
    }
    return (
    <div className='overflow-hidden'>
        
        <Header></Header>
        <SideNavbar toggel={toggel}></SideNavbar>
        <div className={`table-wrapper flex flex-col-reverse mt-16 mb-8  ml-10 px-4 text-black`} style={{ transition:' all 0.3s ease',marginRight:isOpen?'260px':'70px' }} >
            <Outlet></Outlet>
            {/* <Routes>
                <Route path='/menuManagement' element={<MenuManagement></MenuManagement>}>
                </Route>
            </Routes> */}
        </div>
        
    </div>
  )
}

export default MainDashboard
