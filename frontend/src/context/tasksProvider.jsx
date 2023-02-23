import { createContext, useState } from "react";

const TasksContext = createContext()

function TasksProvider({children}) {

  const [addingTask, setAddingTask] = useState(false)
  const [tasks, setTasks] = useState([])

   const addToTasks = (task) => {
    setTasks([...tasks, task])
    console.log(tasks);
   }

  return (
    <TasksContext.Provider
      value={{
        addingTask,
        setAddingTask,
        tasks,
        addToTasks
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export default TasksContext
export {TasksProvider}