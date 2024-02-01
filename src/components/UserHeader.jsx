import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutUser } from "../utils/firebase/firebase.utils";

const activeStyle =
  "block p-4 bg-white border-b-2 border-gray-800 font-semibold";

const UserHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser();
    dispatch(setAllTasks([]));
    navigate("/");
    dispatch(resetUser());
  };

  return (
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
  );
};

export default UserHeader;
