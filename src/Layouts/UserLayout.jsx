import { Outlet, NavLink} from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { useGetUnDismissedTasksQuery } from "../store/tasks/tasks.api";
import { setAllTasks } from '../store/tasks/tasks.slice';
import { extractRecentRecurrings, createRecurrings } from '../helpers/helpers';
import { useAddNewTaskMutation } from '../store/tasks/tasks.api';
import { useEffect } from 'react';

function UserLayout() {
  const dispatch = useDispatch()
  const activeStyle = 'block p-4 bg-white border-b-2 border-gray-800 font-semibold'

  const [postNewTask, {loadingPost, errorPost}] = useAddNewTaskMutation()
  const {data, isLoading, error} = useGetUnDismissedTasksQuery();

  useEffect(() => {
    if(!isLoading) {
      const currentRecurrings = extractRecentRecurrings(data)
      const newRecurrings = createRecurrings(currentRecurrings)

      const all = [...data, ...newRecurrings]

      dispatch(setAllTasks(all))

      try {
        newRecurrings.map(async(iTask) => {
          await postNewTask(iTask)
        })
      } catch (error) {
        console.log(errorPost);
      }
    }
  }, [isLoading, data])

  if(isLoading) {
    return <p>Loading...</p>
  }

  return (
    <Outlet/>
  )

  // return (
  //   <>
  //     <header className='flex bg-slate-100'>
  //       <nav>          
  //         <ul className='flex'>
  //           <li className='text-gray-800'>
  //             <NavLink
  //               to='/'
  //               className={({ isActive, isPending }) => isActive ? activeStyle : "block p-4 font-semibold" }>Todays Tasks
  //             </NavLink>
  //           </li>
  //           <li className='text-gray-800'>
  //             <NavLink
  //               to={'/tasks'}
  //               className={({ isActive, isPending }) => isActive ? activeStyle : "block p-4 font-semibold"}>All Tasks
  //             </NavLink>
  //           </li>
  //           <li className='text-gray-800'>
  //             <NavLink
  //               to={'/reports'}
  //               className={({ isActive, isPending }) => isActive ? activeStyle : "block p-4 font-semibold"}>Reports
  //             </NavLink>
  //           </li>
  //         </ul>
  //       </nav>
  //     </header>
  //     <main className='flex p-8'>
  //       <Outlet />
  //     </main>
  //   </>
  // )
}

export default UserLayout