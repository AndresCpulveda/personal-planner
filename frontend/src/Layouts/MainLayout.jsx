import React from 'react'
import { Outlet } from 'react-router-dom' 

function MainLayout() {
  return (
    <main className='flex p-8'>
      <Outlet />
    </main>
  )
}

export default MainLayout