

import useTasks from './hooks/useTasks';
import Timer from './Timer';

function Task({task}) {
  
  const {addToCompleted, removeCompleted} = useTasks();
  const {name, due, priority} = task;

  return (
    <>
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
            <input type='checkbox' onChange={() => addToCompleted(task)} className=''></input>
          </li>
        }
        <li className='col-span-3 flex items-center border border-white text-white px-2'>{name}</li>
        <li className='col-span-2 flex items-center justify-center border border-white text-white px-2'>{due}</li>
        <li className='col-span-1 flex items-center justify-center border border-white text-white px-2'>{priority}</li>
        <li className='col-span-3 flex items-center justify-center border border-white text-white px-2'> <Timer /> </li>
      </ul>
    </>
  )
}

export default Task