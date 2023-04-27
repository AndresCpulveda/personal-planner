import { useState } from 'react';

import useTasks from '../hooks/useTasks'
import Timer from './Timer';
import { timeFormatter } from '../helpers/helpers';
import { formatPriority } from '../helpers/StyleHelpers';
import EditTask from './EditTask';
import { stylePriority } from '../helpers/StyleHelpers';

function TaskOnAll({task}) {
  const {name, due, priority, time, createdAt, category, completed} = task;
    
  const {addToCompleted, removeCompleted, updateTask} = useTasks();
  const [deleted, setDeleted] = useState(false)

  const [editingTask, setEditingTask] = useState(false)
  
  const handleEditTask = () => {
    setEditingTask(true)
  }
    return (
      <>
        <tr className="odd:bg-white even:bg-gray-50">
          <th className="px-6 py-4 font-medium text-gray-900">{name}</th>
          <td className="px-6 py-4">{due}</td>
          <td className="px-6 py-4">{category}</td>
          <td className="px-6 py-4">
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${completed ? "text-green-600 bg-green-50" : stylePriority(priority)}`}>
              {completed ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
              {completed ? 'completed' : 'uncompleted'}
            </span>
          </td>
          <td className="flex justify-end gap-4 px-6 py-4 font-medium"><a href="">{completed ? "Delete" : "Complete"}</a><a href="" className="text-primary-700">Edit</a></td>
        </tr>

      </>
    )

  // return (
  //   <>
  //   {editingTask ? <EditTask editing={task} setEditingTask={setEditingTask} /> : null}
  //   <ul className={`grid grid-cols-12 ${deleted ? 'hidden' : ''}`}>
  //     <li
  //       className={`col-span-1 flex items-center justify-center p-4 uppercase border border-white ${task.completed ? 'text-green-400' : 'text-red-400'}`}
  //       >{task.completed ? 'done' : 'pending'}
  //     </li>

  //     <li className='col-span-1 flex items-center justify-center border border-white p-4'>
  //       {task.completed ?
  //         <span
  //           onClick={() => {
  //             if (confirm('Do you want to remove this task?')){
  //               removeCompleted(task)
  //               setDeleted(true)
  //             }
  //             }
  //           }>
  //           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 mr-2 transition-all cursor-pointer hover:text-red-700">
  //             <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  //           </svg>
  //         </span> :
  //         <div className='flex'>
  //           <span 
  //             onClick={() => {
  //               task.completed = true
  //               addToCompleted({...task, completed: true})
  //               }
  //             }
  //           >
  //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 mr-2 cursor-pointer hover:text-green-500">
  //               <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  //             </svg>
  //           </span>
  //           <span onClick={() => handleEditTask({...task})}>
  //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mr-2 cursor-pointer hover:text-green-500">
  //               <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  //             </svg>
  //           </span>
  //         </div>
  //       }
  //     </li>

  //     <li className='col-span-3 flex items-center border border-white text-white px-2'>{name}</li>
  //     <li className='col-span-2 flex items-center justify-center border border-white text-white px-2'>{createdAt}</li>
  //     <li className='col-span-2 flex items-center justify-center border border-white text-white px-2'>{due}</li>
  //     <li className={`col-span-1 flex items-center justify-center border border-white px-2 ${formatPriority(priority)}`}>{priority}</li>
  //     {task.completed ? 
  //       <li className='col-span-2 flex items-center justify-center border border-white text-white px-2'>{time}</li>
  //       :
  //       <li className='col-span-2 flex items-center justify-center border border-white text-white px-2'> <Timer task={task} /> </li>
  //     }
  //   </ul>
  //   </>
  // )
}

export default TaskOnAll