import {useEffect, useState} from 'react'

import TaskOnAll from './TaskOnAll';
import sendAxios from '../../config/axios';
import { sortByBoolean, sortDueBoolean, sortPriority, dateFormatter, sortCreatedBoolean, sortTime, sortCategory, extractRecentRecurrings, createRecurrings} from '../helpers/helpers';
import { btnStyles } from '../helpers/StyleHelpers';
import useTasks from '../hooks/useTasks';

function AllTasks() {
  const {addToTasks} = useTasks();
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
        const currentRecurrings = extractRecentRecurrings(formatted)
        const newRecurrings = createRecurrings(currentRecurrings)
        const toAdd = [...formatted, ...newRecurrings]
        setShowingTasks(toAdd)
        setAllTasks(toAdd)
        const savedRecurrings = newRecurrings.map(task => {
          const saved = addToTasks(task)
          return saved
        })
      } catch (error) {
        console.log(error);
      }
    }
    getAllTasks()
  }, [])
  
  const completedTasks = allTasks.filter(task => task.completed)
  const uncompletedTasks = allTasks.filter(task => !task.completed)

  const styles = {
    btns: {
      categoryBtns: 'relative inline-flex cursor-pointer items-center gap-2 rounded-lg  px-3 py-2',
      stateBtns: 'cursor-default rounded-full h-2 w-2 mr-1'
    },
    table: {
      th: 'px-5 py-4 font-medium text-gray-900',
      headings: {
        text: 'flex items-center',
        icons: 'w-5 h-5 mx-2 text-gray-400 cursor-pointer hover:text-gray-900'
      }
    }
  }

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
                className={`${activeBtn === 1 ? btnStyles[1] : ''} ${styles.btns.categoryBtns} hover:bg-gray-200`}
              >All</a>
            </li>
            <li>
              <a 
                onClick={() => {
                  setActiveBtn(2)
                  setShowingTasks(completedTasks)
                }}
                className={`${activeBtn === 2 ? btnStyles[2] : ''} ${styles.btns.categoryBtns} hover:bg-green-100 hover:text-green-500`}
              >Completed</a>
            </li>
            <li>
              <a 
                onClick={() => {
                  setActiveBtn(3)
                  setShowingTasks(uncompletedTasks)
                }}
                className={`${activeBtn === 3 ? btnStyles[3] : ''} ${styles.btns.categoryBtns} hover:bg-red-100 hover:text-red-500`}
              >Uncompleted</a>
            </li>
            <li>
            </li>
          </ul>
          <div className='flex gap-4 ml-2'>
            <span className='text-sm'><button className={`${styles.btns.stateBtns} bg-yellow-500`}></button>Low</span>
            <span className='text-sm'><button className={`${styles.btns.stateBtns} bg-orange-500`}></button>Medium</span>
            <span className='text-sm'><button className={`${styles.btns.stateBtns} bg-red-500`}></button>High</span>
            <span className='text-sm'><button className={`${styles.btns.stateBtns} bg-green-500`}></button>Completed</span>
          </div>
        </div>


        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr className=''>
              <th className={styles.table.th}>
                <span className={styles.table.headings.text}>Task
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className={`${arrowName ? 'rotate-180' : ''} ${styles.table.headings.icons}`}
                    onClick={() => {
                      setShowingTasks(sortByBoolean(showingTasks, arrowName))
                      setArrowName(!arrowName)
                      }
                    }
                  ><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg>
                </span>
              </th>
              <th className={styles.table.th}>
                <span className={styles.table.headings.text}>Due Date
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className={`${arrowDue ? 'rotate-180' : ''} ${styles.table.headings.icons}`}
                    onClick={() => {
                      setArrowDue(sortDueBoolean(showingTasks, arrowDue))
                      setArrowDue(!arrowDue)
                      }
                    }
                  ><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg>
                </span>
              </th>
              <th className={styles.table.th}>
                <span className={styles.table.headings.text}>Category
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className={`${arrowCategory ? 'rotate-180' : ''} ${styles.table.headings.icons}`}
                    onClick={() => {
                      setShowingTasks(sortCategory(showingTasks, arrowCategory))
                      setArrowCategory(!arrowCategory)
                      }
                    }
                  ><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg>
                </span>
              </th>
              <th className={styles.table.th}>
                <span className={styles.table.headings.text}>State
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className={`${arrowPriority ? 'rotate-180' : ''} ${styles.table.headings.icons}`}
                    onClick={() => {
                      setShowingTasks(sortPriority(showingTasks, arrowPriority))
                      setArrowPriority(!arrowPriority)
                      }
                    }
                  ><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg>
                </span>
              </th>
              <th className={styles.table.th}></th>
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