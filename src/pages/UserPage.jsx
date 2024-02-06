import { useSelector } from "react-redux";
import { selectUserUser } from "../store/user/user.selectors";

const UserPage = () => {
  const user = useSelector(selectUserUser);
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col gap-5">
        <h2 className="text-6xl text-blue-900">Welcome Back</h2>
        <h3 className="text-4xl text-blue-800">{user.displayName}</h3>
      </div>
      <div className=""></div>
    </div>
  );
};

export default UserPage;
