import {useState} from 'react'

import TodayDue from '../components/TodayDue'
import TodayCompleted from '../components/TodayCompleted'
import ProgressGraph from '../components/ProgressGraph'
import useTasks from '../hooks/useTasks'

function TodayTasks() {

  const {setAddingTodayTask} = useTasks();

  return (
    <>
    <section className='w-2/3'>
      <div className='mt-10 mb-2 flex gap-4 items-center'>
        <h2 className='uppercase text-white text-3xl font-bold'>today´s due tasks</h2>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
          className="w-6 h-6 text-white cursor-pointer hover:scale-125 transition-all"
          onClick={() => setAddingTodayTask(true)}
          >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <TodayDue />

      <div className='mt-10 mb-2'>
        <h2 className='uppercase text-white text-3xl font-bold'>today`s completed tasks</h2>
      </div>
      <TodayCompleted />

    </section>
    <section className='w-1/3 flex flex-col'>
      <ProgressGraph />
    </section>
    </>
  )
}

export default TodayTasks