import moment from 'moment';

import { ChevronIcon } from './icons/icons';
import { useSelector, useDispatch } from 'react-redux'
import { selectSelectedDate } from "../store/days/days.selectors";
import { changeSelectedDay } from '../store/days/days.reducer';

function DaySelector() {
  const dispatch = useDispatch()
  const selectedDay = useSelector(selectSelectedDate)

  const handleChange = (e) => {
    dispatch(changeSelectedDay(e.target.value))
  }

  const addOneDay = (e) => {
    const calculatedDate = moment(selectedDay).add(1, 'days')
    const formattedDate = moment(calculatedDate).format('YYYY-MM-DD')
    dispatch(changeSelectedDay(formattedDate))
  }

  const substractOneDay = (e) => {
    const calculatedDate = moment(selectedDay).subtract(1, 'days')
    const formattedDate = moment(calculatedDate).format('YYYY-MM-DD')
    dispatch(changeSelectedDay(formattedDate))
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