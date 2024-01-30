import { Route, Routes, BrowserRouter } from "react-router-dom";

import UserLayout from "./Layouts/UserLayout";
import TodayTasks from "./pages/TodayTasks";
import AllTasksPage from "./pages/AllTasksPage";
import ReportsPage from "./pages/ReportsPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./Layouts/MainLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="/dashboard/" element={<UserLayout />}>
              <Route index element={<TodayTasks />} />
              <Route path="/dashboard/tasks" element={<AllTasksPage />} />
              <Route path="/dashboard/reports" element={<ReportsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
