import React from 'react'
import Header from './Header'
import Slider from '../../Components/MainPage/SliderAndMiniBanners'
import Carts from '../../Components/MainPage/Carts'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Main() {
  return (
    <body className='bg-transparent'>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </body>
  )
}

export default Main
