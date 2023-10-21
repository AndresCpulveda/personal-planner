import { useState } from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'

import MainLayout from './Layouts/MainLayout'
import TodayTasks from './pages/TodayTasks'
import { TasksProvider } from './context/tasksProvider'
import AllTasksPage from './pages/AllTasksPage'
import AddTask from './components/AddTask'
import { DaysProvider } from './context/dayProvider'
import ReportsPage from './pages/ReportsPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <DaysProvider>
          <TasksProvider>
            <Routes>
              <Route path='/' element={<MainLayout />}>
                <Route index element={<TodayTasks />}/>
                <Route path='/tasks' element={<AllTasksPage />}/>
                {/* <Route path='/add' element={<AddTask />}/> */}
                <Route path='/reports' element={<ReportsPage />}/>
              </Route>
            </Routes>
          </TasksProvider>
        </DaysProvider>
      </BrowserRouter>
    </>
  )
}

export default App
