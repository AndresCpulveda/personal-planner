import { useContext } from "react";
import TasksContext from "../context/tasksProvider";

function useTasks() {
  return (
    useContext(TasksContext)
  )
}

export default useTasks