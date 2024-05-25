import React from 'react'
import Header from './Header'
import Slider from '../../Components/MainPage/SliderAndMiniBanners'
import Carts from '../../Components/MainPage/Carts'

function Main() {
  return (
    <body className='bg-transparent'>
      <Header></Header>
      <Slider></Slider>
      <Carts></Carts>
    </body>
  )
}

export default Main
