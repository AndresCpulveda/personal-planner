import React from 'react'
import { Outlet, Link} from 'react-router-dom' 

function MainLayout() {
  return (
    <>
      <header className='flex bg-[#171412]'>
        <ul className='flex gap-4'>
          <li className='p-4'><Link className='text-gray-400 cursor-pointer hover:text-white' to='/'>Todays Tasks</Link> </li>
          <li className='p-4'><Link className='text-gray-400 cursor-pointer hover:text-white' to={'/tasks'}>All Tasks</Link></li>
        </ul>
      </header>
      <main className='flex p-8'>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout