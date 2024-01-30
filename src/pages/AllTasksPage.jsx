import { useEffect, useState } from "react";
import AllTasks from "../components/AllTasks";
import TodayDue from "../components/TodayDue";
import AddTask from "../components/AddTask";
import { AddTaskIcon } from "../components/icons/icons";
import { toggleAddingTask } from "../store/tasks/tasks.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectAddingTask } from "../store/tasks/tasks.selectors";

function AllTasksPage() {
  const addingTask = useSelector(selectAddingTask);
  const dispatch = useDispatch();
  return (
    <>
      <section className="w-full">
        <div className="mb-2 mt-10 flex items-center gap-4">
          <h2 className="text-3xl font-bold uppercase text-gray-900">
            all tasks
          </h2>
          <AddTaskIcon
            iconOptions={{ onClick: () => dispatch(toggleAddingTask()) }}
          />
        </div>
        <AllTasks />
        {addingTask ? <AddTask /> : null} {/* Modal for adding task */}
      </section>
    </>
  );
}

export default AllTasksPage;
