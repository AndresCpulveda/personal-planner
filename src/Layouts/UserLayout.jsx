import { Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetUnDismissedTasksQuery } from "../store/tasks/tasks.api";
import { setAllTasks } from "../store/tasks/tasks.slice";
import { extractRecentRecurrings, createRecurrings } from "../helpers/helpers";
import { useAddNewTaskMutation } from "../store/tasks/tasks.api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../store/user/user.selectors";
import { signOutUser } from "../utils/firebase/firebase.utils";
import { resetUser } from "../store/user/user.slice";

function UserLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeStyle =
    "block p-4 bg-white border-b-2 border-gray-800 font-semibold";

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleSignOut = async () => {
    await signOutUser();
    dispatch(setAllTasks([]));
    navigate("/");
    dispatch(resetUser());
  };

  // return <Outlet />;

  return (
    <>
      <header className="flex bg-slate-100">
        <nav className="flex w-full justify-between">
          <ul className="flex">
            <li className="text-gray-800">
              <NavLink
                to="/dashboard"
                className={({ isActive, isPending }) =>
                  isActive ? activeStyle : "block p-4 font-semibold"
                }
              >
                Todays Tasks
              </NavLink>
            </li>
            <li className="text-gray-800">
              <NavLink
                to={"/dashboard/tasks"}
                className={({ isActive, isPending }) =>
                  isActive ? activeStyle : "block p-4 font-semibold"
                }
              >
                All Tasks
              </NavLink>
            </li>
            <li className="text-gray-800">
              <NavLink
                to={"/dashboard/reports"}
                className={({ isActive, isPending }) =>
                  isActive ? activeStyle : "block p-4 font-semibold"
                }
              >
                Reports
              </NavLink>
            </li>
          </ul>
          <ul className="flex">
            <li className="text-gray-800">
              <NavLink
                to="/user"
                className={({ isActive, isPending }) =>
                  isActive ? activeStyle : "block p-4 font-semibold"
                }
              >
                User
              </NavLink>
            </li>
            <li className="text-gray-800">
              <NavLink
                onClick={handleSignOut}
                className={"block p-4 font-semibold"}
              >
                Sign-Out
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex p-8">
        <Outlet />
      </main>
    </>
  );
}

export default UserLayout;
