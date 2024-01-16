import {Route, Routes, BrowserRouter} from 'react-router-dom'

import UserLayout from './Layouts/UserLayout'
import TodayTasks from './pages/TodayTasks'
import AllTasksPage from './pages/AllTasksPage'
import ReportsPage from './pages/ReportsPage'
import AuthLayout from './Layouts/AuthLayout'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/auth' element={<AuthLayout />}>
              <Route index element={<LoginPage />}/>
            </Route>
            <Route path='/' element={<UserLayout />}>
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
