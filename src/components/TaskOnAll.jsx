import { useState } from 'react';

import useTasks from '../hooks/useTasks'
import Timer from './Timer';
import { timeFormatter } from '../helpers/helpers';
import { formatPriority } from '../helpers/StyleHelpers';

function TaskOnAll({task}) {
    
  const {addToCompleted, removeCompleted, updateTime} = useTasks();
  const {name, due, priority, time, createdAt} = task;
  const [deleted, setDeleted] = useState(false)


  return (
    <>
    <ul className={`grid grid-cols-12 ${deleted ? 'hidden' : ''}`}>
      <li
        className={`col-span-1 flex items-center justify-center p-4 uppercase border border-white ${task.completed ? 'text-green-400' : 'text-red-400'}`}
        >{task.completed ? 'done' : 'pending'}
      </li>

      <li className='col-span-1 flex items-center justify-center border border-white p-4'>
        {task.completed ?
        <span
          onClick={() => {
            if (confirm('Do you want to remove this task?')){
              removeCompleted(task)
              setDeleted(true)
            }
            }
          }>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 mr-2 transition-all cursor-pointer hover:text-red-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span> :
        <span 
          onClick={() => {
            task.completed = true
            addToCompleted({...task, completed: true})
            }
          }>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 mr-2 cursor-pointer hover:text-green-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        }
      </li>

      <li className='col-span-3 flex items-center border border-white text-white px-2'>{name}</li>
      <li className='col-span-2 flex items-center justify-center border border-white text-white px-2'>{createdAt}</li>
      <li className='col-span-2 flex items-center justify-center border border-white text-white px-2'>{due}</li>
      <li className={`col-span-1 flex items-center justify-center border border-white px-2 ${formatPriority(priority)}`}>{priority}</li>
      {task.completed ? 
        <li className='col-span-2 flex items-center justify-center border border-white text-white px-2'>{time}</li>
        :
        <li className='col-span-2 flex items-center justify-center border border-white text-white px-2'> <Timer task={task} /> </li>
      }
    </ul>
    </>
  )
}

export default TaskOnAll