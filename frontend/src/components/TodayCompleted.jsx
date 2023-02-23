import React from 'react'

import Task from './Task'

function TodayCompleted() {

  const tasks = [
    {name: "Limpiar el cuarto para que no se vea sucio o desordenado", due: "25/02/2023", priority: "low", time: "00:00:00"},
    {name: "cocinar almuerzo", due: "25/02/2023", priority: "high", time: "00:00:00"},
    {name: "lavar loza", due: "25/02/2023", priority: "medium", time: "00:00:00"},
    {name: "aprender a hacer un timer", due: "25/02/2023", priority: "low", time: "00:00:00"},
    {name: "reportes", due: "25/02/2023", priority: "low", time: "00:00:00"},
  ]


  return (
    <div className='flex flex-column'>
      <div className='w-2/3'>
        <ul className='grid grid-cols-10'>
          <li className='col-span-1 border text-center px-4 border-white'><p className='text-white uppercase'>done</p></li>
          <li className='col-span-3 border text-center px-4 border-white'><p className='text-white uppercase'>name</p></li>
          <li className='col-span-2 border text-center px-4 border-white'><p className='text-white uppercase'>due</p></li>
          <li className='col-span-1 border text-center px-4 border-white'><p className='text-white uppercase'>priority</p></li>
          <li className='col-span-3 border text-center px-4 border-white'><p className='text-white uppercase'>time spent</p></li>
        </ul>
        <div className=''>
          {tasks.map( task => <Task task={task} />)}
        </div>
      </div>
    </div>
  )
}

export default TodayCompleted