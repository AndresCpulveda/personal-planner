import {useEffect, useState} from 'react'
import AllTasks from '../components/AllTasks';
import TodayDue from '../components/TodayDue'
import useTasks from '../hooks/useTasks'

function AllTasksPage() {
  const {loadedTasks} = useTasks();
  return (
    <>
      <section className='w-full'>
        <div className='mt-10 mb-2 flex gap-4 items-center'>
          <h2 className='uppercase text-gray-900 text-3xl font-bold'>all tasks</h2>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="w-6 h-6 text-white cursor-pointer hover:scale-125 transition-all"
            onClick={() => setAddingTodayTask(true)}
            >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        {loadedTasks ? <AllTasks/> : null}
      </section>
    </>
  )

}

export default AllTasksPage