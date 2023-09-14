import { useState } from 'react';
import moment from 'moment';

import useTasks from '../hooks/useTasks'
import Timer from './Timer';
import { toRawDate, toFormattedDate } from '../helpers/helpers';
import { formatPriority } from '../helpers/StyleHelpers';
import EditTask from './EditTask';
import { stylePriority } from '../helpers/StyleHelpers';
import { CheckIcon, NextIcon, PencilIcon, TrashIcon, XIcon, ChevronIcon } from './icons/icons';
import ModalAlert from './ModalAlert';

function TaskOnAll({task}) {
  const {name, due, priority, time, createdAt, category, completed} = task;
    
  const {addToCompleted, updateTask, deleteTask} = useTasks();
  const [deleted, setDeleted] = useState(false)

  const [editingTask, setEditingTask] = useState(false)
  const [modalAlert, setModalAlert] = useState({showing: false})

  const handleCompleteTask = () => {
    addToCompleted(task)
  }
  
  const handleDismissTask = () => {
    setModalAlert({
      message: 'Do you want to dismiss this task? Task will no longer be shown by default on your due or completed lists, but may be found in your reports',
      showing: true,
      action: () => {
        task.dismissed = true
        updateTask(task)
      },
    })
  }
  
  const handleDeleteTask = () => {
    setModalAlert({
      message: 'Do you want to remove this task permanently?',
      showing: true,
      action: () => {
        deleteTask(task)
        setDeleted(true)
      },
    })
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
      <tr className={`odd:bg-white even:bg-gray-50 ${deleted ? "hidden" : ""}`}>
        <th className="px-6 py-4 font-medium text-gray-900">{name}</th>
        <td className="text-gray-500 px-5 py-4">{toFormattedDate(due)}</td>
        <td className="text-gray-500 px-5 py-4">{category}</td>
        <td className="text-gray-500 px-5 py-4">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${completed ? "text-green-600 bg-green-100" : stylePriority(priority)}`}>
            {completed ?
              <CheckIcon isAction={false} iconOptions={{className: 'h-3 w-3'}} />
              :
              <XIcon isAction={false} iconOptions={{className: 'h-3 w-3'}} />
            }
            {completed ? 'completed' : 'uncompleted'}
          </span>
        </td>
        <td className="text-gray-500 flex gap-4 px-5 py-4 font-medium">
          <CheckIcon isAction={true} iconOptions={{
            onClick: handleCompleteTask,
            className: 'hover:text-green-600 cursor-pointer h-5 w-5'
            }}
          />
          <XIcon isAction={true} iconOptions={{
            onClick: handleDismissTask,
            className: 'hover:text-red-600 cursor-pointer h-5 w-5'
            }}
          />
          <TrashIcon isAction={true} iconOptions={{
            onClick: handleDeleteTask,
            className: 'hover:text-red-800 cursor-pointer h-5 w-5'
            }}
          />
          <NextIcon isAction={true} iconOptions={{
            onClick: handleNext,
            className: 'hover:text-green-800 cursor-pointer h-5 w-5'
            }}
          />
          <PencilIcon isAction={true} iconOptions={{
            onClick: handleEditTask,
            className: 'hover:text-blue-600 cursor-pointer h-5 w-5'
            }}
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
        </td>
        <td>
          {editingTask ? <EditTask editing={task} setEditingTask={setEditingTask} /> : null} {/* Modal for editing task */}
          {modalAlert.showing ? <ModalAlert modalAlert={modalAlert} setModalAlert={setModalAlert} task={task} setDeleted={setDeleted}/> : null }
        </td>
      </tr>
    </>
  )
}

export default TaskOnAll