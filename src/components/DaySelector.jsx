import {useEffect, useState} from 'react'
import moment from 'moment';

import useTasks from '../hooks/useTasks';
import { todaysDate } from '../helpers/helpers';

import { ChevronIcon } from './icons/icons';

function DaySelector() {
  const {getDaysTasks} = useTasks();

  const [selectedDay, setSelectedDay] = useState(todaysDate.split('T')[0])

  useEffect(() => {
    getDaysTasks(selectedDay)
  }, [selectedDay])

  const handleChange = (e) => {
    setSelectedDay(e.target.value)
  }

  const addOneDay = (e) => {
    const calculatedDate = moment(selectedDay).add(1, 'days')
    const formattedDate = moment(calculatedDate).format('YYYY-MM-DD')
    setSelectedDay(formattedDate)
  }

  const substractOneDay = (e) => {
    const calculatedDate = moment(selectedDay).subtract(1, 'days')
    const formattedDate = moment(calculatedDate).format('YYYY-MM-DD')
    setSelectedDay(formattedDate)
  }
  return (
    <div className='flex my-4 items-center'>
      <h3 className='font-semibold capitalize'>selected day:</h3>
      <ChevronIcon
        iconOptions={{
          onClick: substractOneDay,
          className: 'cursor-pointer hover:scale-125 transition-all',
        }}
      />
      <input type="date" value={selectedDay} onChange={handleChange} className='input-date bg-slate-200 rounded px-2 py-1'/>
      <ChevronIcon 
        iconOptions={{
          onClick: addOneDay,
          className: 'cursor-pointer hover:scale-125 transition-all rotate-180',
        }}
      />
    </div>
  )
}

export default DaySelector