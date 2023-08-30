import {useState} from 'react'
import useTasks from '../hooks/useTasks';
import { todaysDate } from '../helpers/helpers';

function DaySelector() {
  const {getDaysTasks} = useTasks();

  const [selectedDay, setSelectedDay] = useState(todaysDate)

  const handleChange = (e) => {
    setSelectedDay(e.target.value)
    getDaysTasks(e.target.value)
  }

  return (
    <div className='flex gap-5 my-4'>
      <h3 className='font-semibold capitalize'>selected day:</h3>
      <input type="date" value={selectedDay} onChange={handleChange}/>
      <span>P</span><span>N</span>
    </div>
  )
}

export default DaySelector