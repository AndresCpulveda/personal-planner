import {useEffect, useState} from 'react'
import TaskOnAll from './TaskOnAll';
import sendAxios from '../../config/axios';
import { sortByBoolean, sortDueBoolean, sortPriority, dateFormatter, sortCreatedBoolean, sortTime} from '../helpers/helpers';

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

  const btnStyles = {
    1: 'text-white border-white',
    2: 'text-green-500 border-green-500',
    3: 'text-red-500 border-red-500'
  }

  return (
    <>
      <div className='flex my-4 gap-4'>
        <button
          className={`uppercase p-2 text-xs border ${activeBtn === 1 ? btnStyles[1] : 'text-gray-400 border-gray-400'} cursor-pointer hover:border-white hover:text-white`}
          onClick={() => {
            setActiveBtn(1)
            setShowingTasks(allTasks)
            }
          }>
        all</button>
        <button
          className={`uppercase p-2 text-xs border ${activeBtn === 2 ? btnStyles[2] : 'text-gray-400 border-gray-400'} cursor-pointer hover:border-green-500 hover:text-green-500`}
          onClick={() => {
            setActiveBtn(2)
            setShowingTasks(completedTasks)
            }
          }>
        completed</button>
        <button
          className={`uppercase p-2 text-xs border ${activeBtn === 3 ? btnStyles[3] : 'text-gray-400 border-gray-400'} cursor-pointer hover:border-red-500 hover:text-red-500`}
          onClick={() => {
            setActiveBtn(3)
            setShowingTasks(uncompletedTasks)
            }
          }>
        uncompleted</button>
      </div>

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