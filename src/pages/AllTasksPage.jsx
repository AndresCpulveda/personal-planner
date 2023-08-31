import {useEffect, useState} from 'react'
import AllTasks from '../components/AllTasks';
import TodayDue from '../components/TodayDue'
import useTasks from '../hooks/useTasks'
import AddTask from '../components/AddTask';
import { AddTaskIcon } from '../components/icons/icons';

function AllTasksPage() {
  const {loadedTasks, setAddingTodayTask, addingTodayTask} = useTasks();
  return (
    <>
      <section className='w-full'>
        <div className='mt-10 mb-2 flex gap-4 items-center'>
          <h2 className='uppercase text-gray-900 text-3xl font-bold'>all tasks</h2>
          <AddTaskIcon iconOptions={{onClick: () => setAddingTodayTask(true)}} />
        </div>
        {loadedTasks ? <AllTasks/> : null}
        {addingTodayTask ? <AddTask /> : null} {/* Modal for adding task */}
      </section>
    </>
  )

}

export default AllTasksPage