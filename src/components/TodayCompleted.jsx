

import Task from './Task'
import useTasks from '../hooks/useTasks'

function TodayCompleted() {

  const {todayCompleted} = useTasks();
  
  return (
    <div className="">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr className=''>
            <th className="px-5 py-4 font-medium text-gray-900">
              <span className={`flex`}>Task</span>
            </th>
            <th className="px-5  py-4 font-medium text-gray-900">
              <span className={`flex`}>Due Date</span>
            </th>
            <th className="px-5 py-4 font-medium text-gray-900">
              <span className={`flex`}>Category</span>
            </th>
            <th className="px-5 py-4 font-medium text-gray-900">
              <span className={`flex`}>State</span>
            </th>
            <th className="px-5 py-4 font-medium text-gray-900"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {todayCompleted.map( task => <Task task={task} key={task._id} />)}
        </tbody>
      </table>
    </div>
  )
}

export default TodayCompleted