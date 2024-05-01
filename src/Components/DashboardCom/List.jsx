import React from 'react'

function List(props) {
  return (
    <div className='text-black text-center flex justify-center border-5 mr-20 ml-10 my-10'>
    {props.text}
    </div>
  )
}

export default List
