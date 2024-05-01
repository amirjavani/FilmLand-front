import React, { useState } from 'react'
import SideNavbar from './SideNavbar'
import Header from './Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import List from '../Components/List'

function MainDashboard() {
    
    return (
    <>
        <SideNavbar></SideNavbar>
        <Header></Header>
        <Routes >
            
            <Route path='/List1' element={<List text={"List 1"}></List>}></Route>
            <Route path='/List2' element={<List text={"List 2"}></List>}></Route>
                        
        </Routes>
    </>
  )
}

export default MainDashboard
