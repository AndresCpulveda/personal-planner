import React from 'react'

import Task from './Task'
import useTasks from './hooks/useTasks';
import AddTask from './AddTask';

function TodayDue() {
    const {addingTodayTask, todayDueTasks} = useTasks();

    const orderedList = [...todayDueTasks].sort((a, b) => {
      const priorityOrder = {high: 1, medium: 2, low: 3}
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })    

  return (
    <>
      <div className='flex flex-col'>
        <ul className='grid grid-cols-10'>
          <li className='col-span-1 border text-center border-white'><p className='text-white uppercase'>done</p></li>
          <li className='col-span-3 border text-center border-white'><p className='text-white uppercase'>name</p></li>
          <li className='col-span-2 border text-center border-white'><p className='text-white uppercase'>due</p></li>
          <li className='col-span-1 border text-center border-white'><p className='text-white uppercase'>priority</p></li>
          <li className='col-span-3 border text-center border-white'><p className='text-white uppercase'>time spent</p></li>
        </ul>
        <div className=''>
          {orderedList.map( task => <Task task={task} />)}
          {addingTodayTask ? <AddTask /> : null}
        </div>
      </div>
    </>
  )
}

export default TodayDue