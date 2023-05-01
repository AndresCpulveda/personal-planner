import React from 'react'

import Task from './Task'
import useTasks from '../hooks/useTasks'
import AddTask from './AddTask';
import { sortPriority } from '../helpers/helpers';

function TodayDue() {
    const {addingTodayTask, todayDueTasks} = useTasks();

    const orderedList = sortPriority(todayDueTasks, true)


    return (
      <>
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
            {orderedList.map( task => <Task task={task} key={task._id} />)}
            </tbody>
          </table>
          {addingTodayTask ? <AddTask /> : null}
        </div>
      </>
    )
  // return (
  //   <>
  //     <div className='flex flex-col'>
  //       <ul className='grid grid-cols-10'>
  //         <li className='col-span-1 border text-center border-gray-900'><p className='text-gray-900 uppercase'>done</p></li>
  //         <li className='col-span-3 border text-center border-gray-900'><p className='text-gray-900 uppercase'>name</p></li>
  //         <li className='col-span-2 border text-center border-gray-900'><p className='text-gray-900 uppercase'>due</p></li>
  //         <li className='col-span-1 border text-center border-gray-900'><p className='text-gray-900 uppercase'>priority</p></li>
  //         <li className='col-span-3 border text-center border-gray-900'><p className='text-gray-900 uppercase'>timer</p></li>
  //       </ul>
  //       <div className=''>
  //         {orderedList.map( task => <Task task={task} key={task._id} />)}
  //         {addingTodayTask ? <AddTask /> : null}
  //       </div>
  //     </div>
  //   </>
  // )
}

export default TodayDue