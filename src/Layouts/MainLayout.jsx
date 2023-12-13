import { Outlet, NavLink} from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { useGetUnDismissedTasksQuery } from "../store/tasks/tasks.api";
import { setAllTasks } from '../store/tasks/tasks.slice';

function MainLayout() {
  const dispatch = useDispatch()
  const activeStyle = 'block p-4 bg-white border-b-2 border-gray-800 font-semibold'
  const {data, isLoading, error} = useGetUnDismissedTasksQuery();

  if(isLoading) {
    return <p>Loading...</p>
  }
  dispatch(setAllTasks(data))
  
  return (
    <>
      <header className='flex bg-slate-100'>
        <nav>          
          <ul className='flex'>
            <li className='text-gray-800'>
              <NavLink
                to='/'
                className={({ isActive, isPending }) => isActive ? activeStyle : "block p-4 font-semibold" }>Todays Tasks
              </NavLink>
            </li>
            <li className='text-gray-800'>
              <NavLink
                to={'/tasks'}
                className={({ isActive, isPending }) => isActive ? activeStyle : "block p-4 font-semibold"}>All Tasks
              </NavLink>
            </li>
            <li className='text-gray-800'>
              <NavLink
                to={'/reports'}
                className={({ isActive, isPending }) => isActive ? activeStyle : "block p-4 font-semibold"}>Reports
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className='flex p-8'>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout