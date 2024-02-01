import { Outlet, NavLink } from "react-router-dom";

const activeStyle =
  "block p-4 bg-white border-b-2 border-gray-800 font-semibold";

const AuthHeader = () => {
  return (
    <header className="flex bg-slate-100">
      <nav className="flex w-full justify-between">
        <ul className="flex">
          <li className="text-gray-800">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isActive ? activeStyle : "block p-4 font-semibold"
              }
            >
              Create Account
            </NavLink>
          </li>
          <li className="text-gray-800">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isActive ? activeStyle : "block p-4 font-semibold"
              }
            >
              Log In
            </NavLink>
          </li>
          <li className="text-gray-800">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isActive ? activeStyle : "block p-4 font-semibold"
              }
            >
              About Planner App
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AuthHeader;
