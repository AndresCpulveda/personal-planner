import { Route, Routes, BrowserRouter } from "react-router-dom";

import TodayTasks from "./pages/TodayTasks";
import AllTasksPage from "./pages/AllTasksPage";
import ReportsPage from "./pages/ReportsPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./Layouts/MainLayout";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="/dashboard" element={<TodayTasks />} />
            <Route path="/tasks" element={<AllTasksPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/user" element={<UserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
