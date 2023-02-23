import { useState } from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'

import MainLayout from './Layouts/MainLayout'
import TodayTasks from './pages/TodayTasks'
import { TasksProvider } from './context/tasksProvider'

function App() {

  return (
    <>
      <BrowserRouter>
        <TasksProvider>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<TodayTasks />}/>
            </Route>
          </Routes>
        </TasksProvider>
      </BrowserRouter>
    </>
  )
}

export default App
