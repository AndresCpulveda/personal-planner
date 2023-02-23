import React from 'react'

import TodayDue from '../components/TodayDue'
import TodayCompleted from '../components/TodayCompleted'

function TodayTasks() {
  return (
    <>
    <section className=''>
      <div className='mt-10 mb-2'>
        <h2 className='uppercase text-white text-3xl font-bold'>today´s due tasks</h2>
      </div>

      <TodayDue />

      <div className='mt-10 mb-2'>
        <h2 className='uppercase text-white text-3xl font-bold'>today`s completed tasks</h2>
      </div>

      <TodayCompleted />

    </section>
    </>
  )
}

export default TodayTasks