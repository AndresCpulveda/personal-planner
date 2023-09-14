import { useState } from 'react';

import useTasks from '../hooks/useTasks'
import Timer from './Timer';
import { formatPriority, stylePriority } from '../helpers/StyleHelpers';
import EditTask from './EditTask';
import { CheckIcon, ChevronIcon, NextIcon, PencilIcon, StopIcon, TrashIcon, XIcon } from './icons/icons';
import ModalAlert from './ModalAlert';
import moment from 'moment';
import { toRawDate, toFormattedDate } from '../helpers/helpers';

function Task({task}) {
  
  const {addToCompleted, deleteTask, updateTask} = useTasks();
  const {name, due, priority, time, category, completed, dismissed} = task;

  const [editingTask, setEditingTask] = useState(false)
  
  const handleCompleteTask = () => {
    addToCompleted(task)
  }
  
  const handleDismissTask = () => {
    task.dismissed = true;
    updateTask(task)
  }
  
  const handleDeleteTask = () => {
    if(confirm('Quieres borrar?')) {
      deleteTask(task)
    }
  }
  
  const handleNext = () => {
    const modifiedDate = moment(task.due).add(1, 'days')
    const formattedDate = moment(modifiedDate).format('YYYY-MM-DD')
    task.due = formattedDate
    updateTask(task)
  }
  
  const handleEditTask = () => {
    setEditingTask(true)
  }

  const handleExpandTask = () => {
    console.log('expanding');
  }

  return (
    <>
      <tr className={`odd:bg-white even:bg-gray-50`}>
        {editingTask ? <td><EditTask editing={task} setEditingTask={setEditingTask} /></td> : null}
        <th className="px-6 py-4 font-medium text-gray-900">{name}</th>
        <td className="text-gray-500 px-5 py-4">{toFormattedDate(due)}</td>
        <td className="text-gray-500 px-5 py-4">{category}</td>
        <td className="text-gray-500 px-5 py-4">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${completed ? "text-green-600 bg-green-100" : stylePriority(priority)}`}>
            {completed ?
              <CheckIcon iconOptions={{className: 'h-3 w-3'}} />
              :
              <XIcon iconOptions={{className: 'h-3 w-3'}} />
            }
            {completed ? 'completed' : 'uncompleted'}
          </span>
        </td>
        <td className="px-5 py-4">
          <div className='flex text-slate-500 gap-2'>
            <CheckIcon iconOptions={{
              onClick: handleCompleteTask,
              className: 'hover:text-green-600 cursor-pointer h-5 w-5',
              }}
              description={'Complete'}
            />
            <XIcon iconOptions={{
              onClick: handleDismissTask,
              className: 'hover:text-red-600 cursor-pointer h-5 w-5'
              }}
              description={'Dismiss'}
            />
            <TrashIcon iconOptions={{
              onClick: handleDeleteTask,
              className: 'hover:text-red-800 cursor-pointer h-5 w-5'
              }}
              description={'Delete permanently'}
            />
            <NextIcon iconOptions={{
              onClick: handleNext,
              className: 'hover:text-green-800 cursor-pointer h-5 w-5'
              }}
              description={'Move to next day'}
            />
            <PencilIcon iconOptions={{
              onClick: handleEditTask,
              className: 'hover:text-blue-600 cursor-pointer h-5 w-5'
              }}
              description={'Edit'}
            />
            {/* <StopIcon iconOptions={{
              onClick: handleEditTask,
              className: 'hover:text-blue-600 cursor-pointer h-5 w-5'
              }}
              description={''}
            /> */}
            <ChevronIcon iconOptions={{
              onClick: handleExpandTask,
              className: 'hover:text-blue-600 cursor-pointer h-5 w-5 -rotate-90'
              }}
              description={'Expand details'}
            />
          </div>
          </td>
      </tr>
    </>
  )
}

export default Task