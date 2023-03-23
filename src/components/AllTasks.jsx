import React from 'react'
import useTasks from '../hooks/useTasks';
import TaskOnAll from './TaskOnAll';

function AllTasks() {
  const {allTasks} = useTasks();
  return (
    <>
      <div className='flex flex-col'>
        <ul className='grid grid-cols-12'>
          <li className='col-span-1 border text-center border-white'><p className='text-white uppercase'>status</p></li>
          <li className='col-span-1 border text-center border-white'><p className='text-white uppercase'>actions</p></li>
          <li className='col-span-3 border text-center border-white'><p className='text-white uppercase'>name</p></li>
          <li className='col-span-2 border text-center border-white'><p className='text-white uppercase'>created</p></li>
          <li className='col-span-2 border text-center border-white'><p className='text-white uppercase'>due</p></li>
          <li className='col-span-1 border text-center border-white'><p className='text-white uppercase'>priority</p></li>
          <li className='col-span-2 border text-center border-white'><p className='text-white uppercase'>time spent</p></li>
        </ul>
        <div className=''>
          {allTasks.map( task => <TaskOnAll task={task} key={task._id} />)}
          {/* {addingTodayTask ? <AddTask /> : null} */}
        </div>
      </div>
    </>
  )
}

export default AllTasks