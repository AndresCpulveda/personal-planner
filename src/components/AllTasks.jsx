import {useEffect, useState} from 'react'

import TaskOnAll from './TaskOnAll';
import sendAxios from '../../config/axios';
import { sortByBoolean, sortDueBoolean, sortPriority, dateFormatter, sortCreatedBoolean, sortTime} from '../helpers/helpers';
import { btnStyles } from '../helpers/StyleHelpers';

function AllTasks() {
  const [showingTasks, setShowingTasks] = useState([])
  const [allTasks, setAllTasks] = useState([])
  const [activeBtn, setActiveBtn] = useState('all')

  const [arrowName, setArrowName] = useState(false)
  const [arrowCreated, setArrowCreated] = useState(true)
  const [arrowDue, setArrowDue] = useState(true)
  const [arrowPriority, setArrowPriority] = useState(false)
  const [arrowTime, setArrowTime] = useState(false)
  
  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const {data} = await sendAxios('tasks/all')
        const formatted = data.map(task => {
          task.due = dateFormatter(task.due)
          task.createdAt = dateFormatter(task.createdAt)
          return task
        })
          setShowingTasks(formatted)
        setAllTasks(formatted)
      } catch (error) {
        console.log(error);
      }
    }
    getAllTasks()
  }, [])
  
  const completedTasks = allTasks.filter(task => task.completed)
  const uncompletedTasks = allTasks.filter(task => !task.completed)

  return (
    <>
      <div className="">
        <div className="p-1 mb-4">
          <ul className="flex items-center gap-2 text-sm font-medium">
            <li>
              <a
                onClick={() => {
                  setActiveBtn(1)
                  setShowingTasks(allTasks)
                }}
                className={`${activeBtn === 1 ? btnStyles[1] : ''} relative inline-flex cursor-pointer items-center gap-2 rounded-lg  px-3 py-2 hover:bg-gray-200`}
              >All</a>
            </li>
            <li>
              <a 
                onClick={() => {
                  setActiveBtn(2)
                  setShowingTasks(completedTasks)
                }}
                className={`${activeBtn === 2 ? btnStyles[2] : ''} relative inline-flex cursor-pointer items-center gap-2 rounded-lg  px-3 py-2 hover:bg-green-100`}
              >Completed</a>
            </li>
            <li>
              <a 
                onClick={() => {
                  setActiveBtn(3)
                  setShowingTasks(uncompletedTasks)
                }}
                className={`${activeBtn === 3 ? btnStyles[3] : ''} relative inline-flex cursor-pointer items-center gap-2 rounded-lg  px-3 py-2 hover:bg-red-100`}
              >Uncompleted</a>
            </li>
          </ul>
        </div>

        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">Task</th>
              <th className="px-6 py-4 font-medium text-gray-900">Due Date</th>
              <th className="px-6 py-4 font-medium text-gray-900">Category</th>
              <th className="px-6 py-4 font-medium text-gray-900">State</th>
              <th className="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {showingTasks.map( task => <TaskOnAll task={task} key={task._id} />)}
          </tbody>
        </table>
      </div>
    </>
  )

  return (
    <>
      <div className='flex flex-col'>
        <ul className='grid grid-cols-12'>
          <li className='col-span-1 border text-center border-white'><p className='text-white uppercase'>status</p></li>
          <li className='col-span-1 border text-center border-white'><p className='text-white uppercase'>actions</p></li>
          <li className='grid grid-cols-12 col-span-3 border text-center border-white'>
            <p className='col-span-11 text-white uppercase'>name</p>
            <span className={`col-span-1 flex items-center ${arrowName ? 'rotate-180' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-5 h-5 text-gray-700 cursor-pointer hover:text-white"
                onClick={() => {
                  setShowingTasks(sortByBoolean(showingTasks, arrowName))
                  setArrowName(!arrowName)
                  }
                }
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
              </svg>
            </span>
          </li>
          <li className='grid grid-cols-12 col-span-2 border text-center border-white'>
            <p className='col-span-11 text-white uppercase'>created</p>
            <span className={`col-span-1 flex items-center ${arrowCreated ? 'rotate-180' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-5 h-5 text-gray-700 cursor-pointer hover:text-white"
                onClick={() => {
                  setArrowCreated(sortCreatedBoolean(showingTasks, arrowCreated))
                  setArrowCreated(!arrowCreated)
                  }
                }
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
              </svg>
            </span>
          </li>
          <li className='grid grid-cols-12 col-span-2 border text-center border-white'>
            <p className='col-span-11 text-white uppercase'>due</p>
            <span className={`col-span-1 flex items-center ${arrowDue ? 'rotate-180' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-5 h-5 text-gray-700 cursor-pointer hover:text-white"
                onClick={() => {
                  setArrowDue(sortDueBoolean(showingTasks, arrowDue))
                  setArrowDue(!arrowDue)
                  }
                }
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
              </svg>
            </span>
          </li>
          <li className='grid grid-cols-12 col-span-1 border text-center border-white'>
            <p className='col-span-10 text-white uppercase'>priority</p>
            <span className={`col-span-2 flex items-centerr ${arrowPriority ? 'rotate-180' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-5 h-5 text-gray-700 cursor-pointer hover:text-white"
                onClick={() => {
                  setShowingTasks(sortPriority(showingTasks, arrowPriority))
                  setArrowPriority(!arrowPriority)
                  }
                }
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
              </svg>
            </span>
          </li>
          <li className='grid grid-cols-12 col-span-2 border text-center border-white'>
            <p className='col-span-10 text-white uppercase'>timer</p>
            <span className={`flex items-centerr ${arrowTime ? 'rotate-180' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-5 h-5 text-gray-700 cursor-pointer hover:text-white"
                onClick={() => {
                  sortTime(showingTasks, arrowTime)
                  setArrowTime(!arrowTime)
                  }
                }
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
              </svg>
            </span>
          </li>
        </ul>
        <div className=''>
          {showingTasks.map( task => <TaskOnAll task={task} key={task._id} />)}
        </div>
      </div>
    </>
  )
}

export default AllTasks