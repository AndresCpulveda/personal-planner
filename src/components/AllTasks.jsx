import {useEffect, useState} from 'react'
import useTasks from '../hooks/useTasks';
import TaskOnAll from './TaskOnAll';
import sendAxios from '../../config/axios';
import { dateFormatter } from '../helpers/helpers';

function AllTasks() {
  // const {allTasks} = useTasks();
  const [showingTasks, setShowingTasks] = useState([])
  const [allTasks, setAllTasks] = useState([])
  const [activeBtn, setActiveBtn] = useState('all')
  
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
          <li className='col-span-3 border text-center border-white'><p className='text-white uppercase'>name</p></li>
          <li className='col-span-2 border text-center border-white'><p className='text-white uppercase'>created</p></li>
          <li className='col-span-2 border text-center border-white'><p className='text-white uppercase'>due</p></li>
          <li className='col-span-1 border text-center border-white'><p className='text-white uppercase'>priority</p></li>
          <li className='col-span-2 border text-center border-white'><p className='text-white uppercase'>time spent</p></li>
        </ul>
        <div className=''>
          {showingTasks.map( task => <TaskOnAll task={task} key={task._id} />)}
        </div>
      </div>
    </>
  )
}

export default AllTasks