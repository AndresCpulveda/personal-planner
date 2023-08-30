import { useState } from 'react';

import useTasks from '../hooks/useTasks'
import Timer from './Timer';
import { formatPriority } from '../helpers/StyleHelpers';
import EditTask from './EditTask';
import { stylePriority } from '../helpers/StyleHelpers';
import { CheckIcon, XIcon } from './icons';

function Task({task}) {
  
  const {addToCompleted, removeCompleted} = useTasks();
  const {name, due, priority, time, category, completed} = task;

  const [editingTask, setEditingTask] = useState(false)

  const handleEditTask = () => {
    setEditingTask(true)
  }

  return (
    <>
      <tr className={`odd:bg-white even:bg-gray-50`}>
        {editingTask ? <td><EditTask editing={task} setEditingTask={setEditingTask} /></td> : null}
        <th className="px-6 py-4 font-medium text-gray-900">{name}</th>
        <td className="text-gray-500 px-6 py-4">{due}</td>
        <td className="text-gray-500 px-6 py-4">{category}</td>
        <td className="text-gray-500 px-6 py-4">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${completed ? "text-green-600 bg-green-100" : stylePriority(priority)}`}>
            {completed ?
              <CheckIcon />
              :
              <XIcon />
            }
            {completed ? 'completed' : 'uncompleted'}
          </span>
        </td>
        <td className="text-gray-500 flex justify-end gap-4 px-6 py-4 font-medium">
          <button
            className={`${completed ? "hover:text-red-600" : "hover:text-green-600"}`}
            onClick={e => {
              if(completed) {
                if (confirm('Do you want to remove this task?')){
                  removeCompleted(task)
                }
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
      </tr>
    </>
  )
}

export default Task