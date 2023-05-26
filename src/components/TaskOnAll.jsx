import { useState } from 'react';

import useTasks from '../hooks/useTasks'
import Timer from './Timer';
import { timeFormatter } from '../helpers/helpers';
import { formatPriority } from '../helpers/StyleHelpers';
import EditTask from './EditTask';
import { stylePriority } from '../helpers/StyleHelpers';
import ModalAlert from './ModalAlert';

function TaskOnAll({task}) {
  const {name, due, priority, time, createdAt, category, completed} = task;
    
  const {addToCompleted, updateTask, addingTodayTask} = useTasks();
  const [deleted, setDeleted] = useState(false)

  const [editingTask, setEditingTask] = useState(false)
  const [modalAlert, setModalAlert] = useState(false)
  
  const handleEditTask = () => {
    setEditingTask(true)
  }

  return (
    <>
      <tr className={`odd:bg-white even:bg-gray-50 ${deleted ? "hidden" : ""}`}>
        <th className="px-6 py-4 font-medium text-gray-900">{name}</th>
        <td className="text-gray-500 px-6 py-4">{due}</td>
        <td className="text-gray-500 px-6 py-4">{category}</td>
        <td className="text-gray-500 px-6 py-4">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${completed ? "text-green-600 bg-green-100" : stylePriority(priority)}`}>
            {completed ?
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
            {completed ? 'completed' : 'uncompleted'}
          </span>
        </td>
        <td className="text-gray-500 flex justify-end gap-4 px-6 py-4 font-medium">
          <button
            className={`${completed ? "hover:text-red-600" : "hover:text-green-600"}`}
            onClick={e => {
              if(completed) {
                setModalAlert(true)
              }else {
                task.completed = true
                addToCompleted({...task, completed: true})
              }
            }}
          >{completed ? "Delete" : "Complete"}</button>
          <button
            onClick={handleEditTask}
            className='hover:text-blue-700'
          >Edit</button></td>
        <td>
          {addingTodayTask ? <AddTask /> : null} {/* Modal for adding task */}
          {editingTask ? <EditTask editing={task} setEditingTask={setEditingTask} /> : null} {/* Modal for editing task */}
          {modalAlert ? <ModalAlert setModalAlert={setModalAlert} task={task} setDeleted={setDeleted}/> : null }
        </td>
      </tr>
    </>
  )
}

export default TaskOnAll