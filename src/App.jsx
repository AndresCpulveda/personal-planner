import {Route, Routes, BrowserRouter} from 'react-router-dom'

import MainLayout from './Layouts/MainLayout'
import TodayTasks from './pages/TodayTasks'
import AllTasksPage from './pages/AllTasksPage'
import ReportsPage from './pages/ReportsPage'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<TodayTasks />}/>
              <Route path='/tasks' element={<AllTasksPage />}/>
              {/* <Route path='/add' element={<AddTask />}/> */}
              <Route path='/reports' element={<ReportsPage />}/>
            </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
