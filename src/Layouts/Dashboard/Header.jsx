import React from 'react'
import '../../index.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='d-flex flex-row text-white justify-content-between  p-2 fixed w-100 z-50' style={{backgroundColor:" #252F41", height:""}}>
      <p className='my-auto mx-4' > ادمین سایت </p>
      <Link className='bi bi-house-door-fill fs-5 mx-3  my-auto  btn btn-outline-secondary' to={'/'}  style={{backgroundColor:"transparent" , border:"none"}}> </Link>
    </div>
  )
}

export default Header
