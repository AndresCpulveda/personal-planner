import React from 'react'
import { Outlet } from 'react-router-dom' 

function MainLayout() {
  return (
    <main className='bg-stone-900 h-screen p-8'>
      <Outlet />
    </main>
  )
}

export default MainLayout