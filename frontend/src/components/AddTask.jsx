import {useState} from 'react'

import useTasks from './hooks/useTasks';
import Timer from './Timer';

function AddTask() {

  const {addToDueTasks, setAddingTodayTask} = useTasks();

  const [name, setName] = useState("")
  const [due, setDue] = useState("")
  const [priority, setPriority] = useState("")

  const addNewTask = () => {
    const task = {
      name, due, priority, time: "00:00:00"
    }
    addToDueTasks(task)
    setAddingTodayTask(false)
  }


  return (
    <ul className='grid grid-cols-10'>
      <li className='col-span-1 flex justify-center border border-white px-4 text-white p-4' >
        <span onClick={() => {addNewTask()}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500 mr-2 cursor-pointer hover:text-green-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <span onClick={() => setAddingTodayTask(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 mr-2 cursor-pointer hover:text-red-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      </li>
      <li className='col-span-3 flex border border-white'>
        <input
          className='bg-transparent w-full text-white px-2'
          onChange={e => setName(e.target.value)}
        ></input></li>
      <li className='col-span-2 flex border border-white'>
        <input
          type='date'
          className='bg-transparent w-full text-white px-2'
          onChange={e => setDue(e.target.value)}
        ></input></li>
      <li className='col-span-1 flex border border-white'>
        <select defaultValue={"empty"} className='bg-transparent w-full text-white px-2 ' onChange={e => setPriority(e.target.value)}>
          <option value="empty"></option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select></li>
      <li className='col-span-3 flex items-center justify-center border border-white text-white px-2'>
        <div className='flex gap-2'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <p>00:00</p>
        </div>
      </li>
    </ul>

  )
}

export default AddTask