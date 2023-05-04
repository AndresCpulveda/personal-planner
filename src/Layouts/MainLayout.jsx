import React from 'react'
import { Outlet, NavLink} from 'react-router-dom' 

function MainLayout() {
  const activeStyle = 'block p-4 bg-white border-b-2 border-gray-800 font-semibold'

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