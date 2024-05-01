import React from 'react'
import '../index.css'

function Header() {
  return (
    <div className='d-flex flex-row text-white justify-content-between  p-2' style={{backgroundColor:" #252F41", height:""}}>
      <p className='my-auto mx-4' > ادمین سایت </p>
      <i className='bi bi-house-door-fill fs-5 mx-3  my-auto  btn btn-outline-secondary'  style={{backgroundColor:"transparent" , border:"none"}}> </i>
    </div>
  )
}

export default Header
