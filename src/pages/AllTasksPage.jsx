import {useEffect, useState} from 'react'
import AllTasks from '../components/AllTasks';
import TodayDue from '../components/TodayDue'
import AddTask from '../components/AddTask';
import { AddTaskIcon } from '../components/icons/icons';
import { toggleAddingTask } from '../store/tasks/tasks.slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectAddingTask } from '../store/tasks/tasks.selectors';

function AllTasksPage() {
  const addingTask = useSelector(selectAddingTask)
  const dispatch = useDispatch()
  return (
    <>
      <section className='w-full'>
        <div className='mt-10 mb-2 flex gap-4 items-center'>
          <h2 className='uppercase text-gray-900 text-3xl font-bold'>all tasks</h2>
          <AddTaskIcon iconOptions={{onClick: () => dispatch(toggleAddingTask())}} />
        </div>
        <AllTasks/>
        {addingTask ? <AddTask /> : null} {/* Modal for adding task */}
      </section>
    </>
  )

}

export default AllTasksPage