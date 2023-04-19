import { useState } from 'react';

import useTasks from '../hooks/useTasks'
import Timer from './Timer';
import { formatPriority } from '../helpers/StyleHelpers';
import EditTask from './EditTask';

function Task({task}) {
  
  const {addToCompleted, removeCompleted} = useTasks();
  const {name, due, priority, time} = task;

  const [editingTask, setEditingTask] = useState(false)

  const handleEditTask = () => {
    setEditingTask(true)
  }

  return (
    <>
      {editingTask ? <EditTask editing={task} setEditingTask={setEditingTask} /> : null}
      <ul className='grid grid-cols-10'>
        {task.completed ?
          <li className='col-span-1 flex items-center justify-center border border-white p-4'>
            <span onClick={() => confirm('Do you want to remove this task?') ? removeCompleted(task) : null}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 mr-2 transition-all cursor-pointer hover:text-red-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </li> :
          <li className='col-span-1 flex items-center justify-center border border-white p-4'>
            <span onClick={() => addToCompleted({...task, completed: true})}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 mr-2 cursor-pointer hover:text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span onClick={() => handleEditTask({...task})}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mr-2 cursor-pointer hover:text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </span>
          </li>
        }
        <li className='col-span-3 flex items-center border border-white text-white px-2'>{name}</li>
        <li className='col-span-2 flex items-center justify-center border border-white text-white px-2'>{due}</li>
        <li className={`col-span-1 flex items-center justify-center border border-white px-2 ${formatPriority(priority)}`}>{priority}</li>
        {task.completed ? 
          <li className='col-span-3 flex items-center justify-center border border-white text-white px-2'>{task.time}</li>
          :
          <li className='col-span-3 flex items-center justify-center border border-white text-white px-2'> <Timer task={task} /> </li>
        }
      </ul>
    </>
  )
}

export default Task