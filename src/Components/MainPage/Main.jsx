import React from 'react'
import Header from '../../Layouts/MainPage/Header'
import Slider from './Slider'
import Carts from './Carts'

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
