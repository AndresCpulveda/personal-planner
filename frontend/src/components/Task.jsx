import React from 'react'

function Task({task}) {
  const {name, due, priority, time} = task;
  return (
    <>
      <ul className='grid grid-cols-10'>
        <li className='col-span-1 flex items-center justify-center border border-white px-4'><input type='checkbox' className=''></input></li>
        <li className='col-span-3 flex items-center border border-white text-white px-2'>{name}</li>
        <li className='col-span-2 flex items-center justify-center border border-white text-white px-2'>{due}</li>
        <li className='col-span-1 flex items-center justify-center border border-white text-white px-2'>{priority}</li>
        <li className='col-span-3 flex items-center justify-center border border-white text-white px-2'><p><span>I</span> {time} <span></span></p></li>
      </ul>
    </>
  )
}

export default Task