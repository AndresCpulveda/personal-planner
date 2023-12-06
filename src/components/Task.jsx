import { useState } from 'react'
import moment from 'moment'

import useTasks from '../hooks/useTasks'
import { toFormattedDate } from '../helpers/helpers'
import { stylePriority } from '../helpers/StyleHelpers'
import { CheckIcon, ChevronIcon, NextIcon, PencilIcon, TrashIcon, XIcon } from './icons/icons'
import EditTask from './EditTask'
import ModalAlert from './ModalAlert'

import { modifyTask } from '../store/tasks/tasks.utils'
import { useDispatch, useSelector } from 'react-redux'
import { selectTodaysDate } from '../store/days/days.selectors'
import { selectTasksTasks } from '../store/tasks/tasks.selectors'
import { setAllTasks } from '../store/tasks/tasks.slice'
import { useUpdateTaskMutation } from '../store/tasks/tasks.api'


function Task ({ task }) {
  const { deleteTask, updateTask } = useTasks()
  const { name, due, priority, category, completed } = task

  const [deleted, setDeleted] = useState(false)
  const [editingTask, setEditingTask] = useState(false)
  const [modalAlert, setModalAlert] = useState({ showing: false })


  const dispatch = useDispatch()
  const todaysDate = useSelector(selectTodaysDate)
  const allTasks = useSelector(selectTasksTasks)
  const [postUpdatedTask, {isLoading, error}] = useUpdateTaskMutation()

  const taskUpdateDispatcher = async (modifiedTask) => {
    dispatch(setAllTasks(modifyTask(modifiedTask, allTasks)))

    try {
      await postUpdatedTask(modifiedTask)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleCompleteTask = async () => {
    const modifiedTask = {...task, completed: true, completedAt: todaysDate}
    taskUpdateDispatcher(modifiedTask)
  }

  const handleDismissTask = () => {
    setModalAlert({
      message: 'Do you want to dismiss this task? Task will no longer be shown by default on your due or completed lists, but may be found in your reports',
      showing: true,
      action: () => {
        const modifiedTask = {...task, dismissed: true}
        taskUpdateDispatcher(modifiedTask)
        setModalAlert({ showing: false })
      }
    })
  }

  const handleDeleteTask = () => {
    setModalAlert({
      message: 'Do you want to remove this task permanently?',
      showing: true,
      action: () => {
        deleteTask(task)
        setDeleted(true)
        setModalAlert({ showing: false })
      }
    })
  }

  const handleNext = async () => {
    const taskDate = task.due.split('T')[0]
    const addedDate = moment(taskDate).add(1, 'days')
    const formattedDate = moment(addedDate).format('YYYY-MM-DD')
    const modifiedTask = {...task, due: formattedDate}
    taskUpdateDispatcher(modifiedTask)
  }

  const handleEditTask = () => {
    setEditingTask(true)
  }

  const handleExpandTask = () => {
    console.log('expanding')
  }

  return (
    <>
      <tr className={`odd:bg-white even:bg-gray-50 ${deleted ? 'hidden' : ''}`}>
        <th className='px-6 py-4 font-medium text-gray-900'>{name}</th>
        <td className='text-gray-500 px-5 py-4'>{toFormattedDate(due)}</td>
        <td className='text-gray-500 px-5 py-4'>{category}</td>
        <td className='text-gray-500 px-5 py-4'>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${completed ? 'text-green-600 bg-green-100' : stylePriority(priority)}`}>
            {completed
              ? <CheckIcon iconOptions={{ className: 'h-3 w-3' }} />
              : <XIcon iconOptions={{ className: 'h-3 w-3' }} />}
            {completed ? 'completed' : 'uncompleted'}
          </span>
        </td>
        <td className='flex gap-4 px-5 py-4'>
          <div className='flex text-slate-500 gap-2'>
            <CheckIcon
              iconOptions={{
                onClick: handleCompleteTask,
                className: 'hover:text-green-600 cursor-pointer h-5 w-5'
              }}
              description='Complete'
            />
            <XIcon
              iconOptions={{
                onClick: handleDismissTask,
                className: 'hover:text-red-600 cursor-pointer h-5 w-5'
              }}
              description='Dismiss'
            />
            <TrashIcon
              iconOptions={{
                onClick: handleDeleteTask,
                className: 'hover:text-red-800 cursor-pointer h-5 w-5'
              }}
              description='Delete permanently'
            />
            <NextIcon
              iconOptions={{
                onClick: handleNext,
                className: 'hover:text-green-800 cursor-pointer h-5 w-5'
              }}
              description='Move to next day'
            />
            <PencilIcon
              iconOptions={{
                onClick: handleEditTask,
                className: 'hover:text-blue-600 cursor-pointer h-5 w-5'
              }}
              description='Edit'
            />
            {/* <StopIcon iconOptions={{
              onClick: handleEditTask,
              className: 'hover:text-blue-600 cursor-pointer h-5 w-5'
              }}
              description={''}
            /> */}
            <ChevronIcon
              iconOptions={{
                onClick: handleExpandTask,
                className: 'hover:text-blue-600 cursor-pointer h-5 w-5 -rotate-90'
              }}
              description='Expand details'
            />
          </div>
        </td>
        <td>
          {editingTask ? <EditTask editing={task} setEditingTask={setEditingTask} /> : null} {/* Modal for editing task */}
          {modalAlert.showing ? <ModalAlert modalAlert={modalAlert} setModalAlert={setModalAlert} task={task} setDeleted={setDeleted} /> : null}
        </td>
      </tr>
    </>
  )
}

export default Task
