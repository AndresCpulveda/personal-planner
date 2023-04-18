import {useState} from 'react'

import useTasks from '../hooks/useTasks'
import Alert from './Alert'
import { getTodaysDate } from '../helpers/helpers';
import { timeFormatter } from '../helpers/helpers';

function AddTask() {

  const formattedDate = getTodaysDate()

  const {addToDueTasks, setAddingTodayTask} = useTasks();

  const [name, setName] = useState("")
  const [due, setDue] = useState(formattedDate)
  const [priority, setPriority] = useState("")
  const [isRecurring, setIsRecurring] = useState(false)
  const [frequencyInterval, setFrequencyInterval] = useState(1)
  const [intervalUnit, setIntervalUnit] = useState("")
  const [category, setCategory] = useState("")
  const [hoursToComplete, setHoursToComplete] = useState(0)
  const [minutesToComplete, setMinutesToComplete] = useState(0)

  const [alert, setAlert] = useState({})

  const addNewTask = (e) => {
    e.preventDefault()
    if([name, due, priority].includes('')) {
      setAlert({msg: 'Use all the fields', error: true})
      setTimeout(() => {
        setAlert({})
      }, 3000);
      return
    }
    console.log(hoursToComplete * 3600 + minutesToComplete * 60);
    const task = {
      name, due, priority, isRecurring, frequencyInterval, intervalUnit, category, time: timeFormatter(hoursToComplete * 3600 + minutesToComplete * 60)
    }

    addToDueTasks(task)
    setAddingTodayTask(false)
  }


  return (
  <>
    <div
      className='fixed top-0 left-0 w-screen h-screen bg-gray-800 opacity-95 out-modal p-8 flex place-content-center'
      onClick={e => e.target.classList.contains('out-modal') ? setAddingTodayTask(false) : null}
    >
      <form
        className='w-2/4 bg-white rounded py-8 px-24 flex flex-col justify-evenly'
        onSubmit={addNewTask}
      >
        <div className='grid grid-cols-2'>
          <div className='grid gap-8'>
            <label className='uppercase'>Name</label>
            <label className='uppercase'>Due Date</label>
            <label className='uppercase'>Priority</label>
            <label className='uppercase'>Recurring Task?</label>
            <label className={`flex ${isRecurring ? '' : 'text-gray-500'} uppercase`}>Frecuency</label>
            <label className='uppercase'>Category</label>
            <label className='uppercase'>time to complete</label>
          </div>

          <div className='grid gap-8'>
            <input
              autoFocus
              className='bg-gray-300 rounded-md h-8 px-2'
              value={name}
              onChange={e => setName(e.target.value)}
            ></input>

            <input
              defaultValue={due}
              type='date'
              className='bg-gray-300 rounded-md h-8 px-2'
              onChange={e => setDue(e.target.value)}
            ></input>

            <select required defaultValue={"empty"} className='bg-gray-300 rounded-md h-8 p-2' onChange={e => setPriority(e.target.value)}>
              <option value="empty"></option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <select required defaultValue={"No"} className='bg-gray-300 rounded-md h-8 p-2' onChange={e => setIsRecurring(e.target.value === "No" ? false : true)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <div className={`flex ${isRecurring ? '' : 'text-gray-500'}`}>
              <span className='mr-2 pt-1'>Every:</span>
              <input type='number' value={frequencyInterval} disabled={!isRecurring} className='bg-gray-300 rounded-md h-8 w-12 p-2' onChange={e => setFrequencyInterval(e.target.value)}></input>
              <select disabled={!isRecurring} onChange={e => {setIntervalUnit(e.target.value)}}>
                <option value='days'>Days</option>
                <option value='weeks'>Weeks</option>
                <option value='months'>Months</option>
              </select>
            </div>

            <input className='bg-gray-300 rounded-md h-8 p-2' onChange={e => setCategory(e.target.value)}></input>

            <div className={`flex`}>
              <input type='number' className='bg-gray-300 rounded-md h-8 w-16 p-2' onChange={e => setHoursToComplete(parseInt(e.target.value))}></input>
              <span className='ml-1 mr-4 pt-1'>Hours</span>
              <input type='number' className='bg-gray-300 rounded-md h-8 w-16 p-2' onChange={e => setMinutesToComplete(parseInt(e.target.value))}></input>
              <span className='ml-1 mr-4 pt-1'>minutes</span>
            </div>
          </div>
        </div>
        {alert.msg ? <Alert alert={alert} />
          :
          <input
            type='submit'
            className={`bg-blue-700 uppercase text-lg text-white border border-white py-2 rounded-md w-full font-bold text-center cursor-pointer`}
          ></input>
        }
      </form>
    </div>
  </>
    // {alert.msg ? <Alert alert={alert} /> : null}
    // <ul className='grid grid-cols-10'>
    //   <li className='col-span-1 flex justify-center border border-white px-4 text-white p-4' >
    //     <span  onClick={() => {addNewTask()}}>
    //       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-700 mr-2 cursor-pointer hover:text-green-500">
    //         <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    //       </svg>
    //     </span>
    //     <span onClick={() => setAddingTodayTask(false)}>
    //       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 mr-2 cursor-pointer hover:text-red-700">
    //         <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    //       </svg>
    //     </span>
    //   </li>
    //   <li className='col-span-3 flex border border-white'>
    //     <input
    //       autoFocus
    //       className='bg-transparent w-full text-white px-2'
    //       onChange={e => setName(e.target.value)}
    //     ></input></li>
    //   <li className='col-span-2 flex border border-white'>
    //     <input
    //       defaultValue={due}
    //       type='date'
    //       className='bg-transparent w-full text-white px-2'
    //       onChange={e => setDue(e.target.value)}
    //     ></input></li>
    //   <li className='col-span-1 flex border border-white'>
    //     <select required defaultValue={"empty"} className='bg-transparent w-full text-white px-2 ' onChange={e => setPriority(e.target.value)}>
    //       <option value="empty"></option>
    //       <option value="Low">Low</option>
    //       <option value="Medium">Medium</option>
    //       <option value="High">High</option>
    //     </select></li>
    //   <li className='col-span-3 flex items-center justify-center border border-white text-white px-2'>
    //     <div className='flex gap-2'>
    //       <span>
    //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //           <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    //         </svg>
    //       </span>
    //       <p>00:00</p>
    //     </div>
    //   </li>
    // </ul>
  )
}

export default AddTask