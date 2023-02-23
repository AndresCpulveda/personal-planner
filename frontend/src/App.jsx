import { useState } from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'

import MainLayout from './Layouts/MainLayout'
import TodayTasks from './pages/TodayTasks'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<TodayTasks />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
