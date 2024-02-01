import TodayDue from "../components/TodayDue";
import TodayCompleted from "../components/TodayCompleted";
import ProgressGraph from "../components/ProgressGraph";
import SavingSpinner from "../components/SavingSpinner";
import { AddTaskIcon } from "../components/icons/icons";
import DaySelector from "../components/DaySelector";
import { toggleAddingTask } from "../store/tasks/tasks.slice";
import { useDispatch } from "react-redux";

import { useGetUnDismissedTasksQuery } from "../store/tasks/tasks.api";
import { setAllTasks } from "../store/tasks/tasks.slice";
import { extractRecentRecurrings, createRecurrings } from "../helpers/helpers";
import { useAddNewTaskMutation } from "../store/tasks/tasks.api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../store/user/user.selectors";

function TodayTasks() {
  const dispatch = useDispatch();

  const [postNewTask, { loadingPost, errorPost }] = useAddNewTaskMutation();
  const { data, isLoading, error } = useGetUnDismissedTasksQuery(
    useSelector(selectUserId),
  );

  useEffect(() => {
    if (!isLoading) {
      const currentRecurrings = extractRecentRecurrings(data);
      const newRecurrings = createRecurrings(currentRecurrings);

      const all = [...data, ...newRecurrings];

      dispatch(setAllTasks(all));

      try {
        newRecurrings.map(async (iTask) => {
          await postNewTask(iTask);
        });
      } catch (error) {
        console.log(errorPost);
      }
    }
  }, [isLoading, data]);

  return (
    <>
      <section className="w-2/3">
        <DaySelector />
        <div className="mb-2 mt-10 flex items-center gap-4">
          <h2 className="text-3xl font-bold uppercase text-gray-900">
            today´s due tasks
          </h2>
          <AddTaskIcon
            iconOptions={{ onClick: () => dispatch(toggleAddingTask()) }}
          />
        </div>
        <TodayDue />

        <div className="mb-2 mt-10">
          <h2 className="text-3xl font-bold uppercase text-gray-900">
            today`s completed tasks
          </h2>
        </div>
        <TodayCompleted />
      </section>
      {/* <section className='w-1/3 flex flex-col'>
      <ProgressGraph />
    </section> */}
    </>
  );
}

export default TodayTasks;
