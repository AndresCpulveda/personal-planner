import {useEffect, useState} from 'react'

import TaskOnAll from './TaskOnAll';
import sendAxios from '../../config/axios';
import { sortByBoolean, sortDueBoolean, sortPriority, dateFormatter, sortCreatedBoolean, sortTime, sortCategory} from '../helpers/helpers';
import { btnStyles } from '../helpers/StyleHelpers';

function AllTasks() {
  const [showingTasks, setShowingTasks] = useState([])
  const [allTasks, setAllTasks] = useState([])
  const [activeBtn, setActiveBtn] = useState('all')

  const [arrowName, setArrowName] = useState(false)
  const [arrowCategory, setArrowCategory] = useState(true)
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
        <div className="flex align-center justify-between p-1 mb-4">
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
                className={`${activeBtn === 2 ? btnStyles[2] : ''} relative inline-flex cursor-pointer items-center gap-2 rounded-lg  px-3 py-2 hover:bg-green-100 hover:text-green-500`}
              >Completed</a>
            </li>
            <li>
              <a 
                onClick={() => {
                  setActiveBtn(3)
                  setShowingTasks(uncompletedTasks)
                }}
                className={`${activeBtn === 3 ? btnStyles[3] : ''} relative inline-flex cursor-pointer items-center gap-2 rounded-lg  px-3 py-2 hover:bg-red-100 hover:text-red-500`}
              >Uncompleted</a>
            </li>
            <li>
            </li>
          </ul>
          <div className='flex gap-4 ml-2'>
            <span className='text-sm'><button className='cursor-default rounded-full bg-yellow-500 h-2 w-2 mr-1'></button>Low</span>
            <span className='text-sm'><button className='cursor-default rounded-full bg-orange-500 h-2 w-2 mr-1'></button>Medium</span>
            <span className='text-sm'><button className='cursor-default rounded-full bg-red-500 h-2 w-2 mr-1'></button>High</span>
            <span className='text-sm'><button className='cursor-default rounded-full bg-green-500 h-2 w-2 mr-1'></button>Completed</span>
          </div>
        </div>


        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr className=''>
              <th className="px-5 py-4 font-medium text-gray-900">
                <span className={`flex items-center`}>Task
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className={`${arrowName ? 'rotate-180' : ''} w-5 h-5 mx-2 text-gray-400 cursor-pointer hover:text-gray-900`}
                    onClick={() => {
                      setShowingTasks(sortByBoolean(showingTasks, arrowName))
                      setArrowName(!arrowName)
                      }
                    }
                  ><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg>
                </span>
              </th>
              <th className="px-5  py-4 font-medium text-gray-900">
                <span className={`flex items-center`}>Due Date
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className={`${arrowDue ? 'rotate-180' : ''} w-5 h-5 mx-2 text-gray-400 cursor-pointer hover:text-gray-900`}
                    onClick={() => {
                      setArrowDue(sortDueBoolean(showingTasks, arrowDue))
                      setArrowDue(!arrowDue)
                      }
                    }
                  ><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg>
                </span>
              </th>
              <th className="px-5 py-4 font-medium text-gray-900">
                <span className={`flex items-center`}>Category
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className={`${arrowCategory ? 'rotate-180' : ''} w-5 h-5 mx-2 text-gray-400 cursor-pointer hover:text-gray-900`}
                    onClick={() => {
                      setShowingTasks(sortCategory(showingTasks, arrowCategory))
                      setArrowCategory(!arrowCategory)
                      }
                    }
                  ><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg>
                </span>
              </th>
              <th className="px-5 py-4 font-medium text-gray-900">
                <span className={`flex items-center`}>State
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className={`${arrowPriority ? 'rotate-180' : ''} w-5 h-5 mx-2 text-gray-400 cursor-pointer hover:text-gray-900`}
                    onClick={() => {
                      setShowingTasks(sortPriority(showingTasks, arrowPriority))
                      setArrowPriority(!arrowPriority)
                      }
                    }
                  ><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg>
                </span>
              </th>
              <th className="px-5 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {showingTasks.map( task => <TaskOnAll task={task} key={task._id} />)}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AllTasks