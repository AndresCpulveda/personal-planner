import { createContext, useState } from "react";

const TasksContext = createContext()

function TasksProvider({children}) {

  const [addingTask, setAddingTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [completed, setCompleted] = useState([])

   const addToTasks = (task) => {
    const toAdd = {
      ...task,
      completed: false
    }
    setTasks([...tasks, toAdd])
   }

   const addToCompleted = (task) => {
    const newDueList = tasks.filter(due => due.name != task.name)
    setTasks(newDueList)
    const toAdd = {
      ...task,
      completed: true
    }
    setCompleted([toAdd, ...completed])
   }

   const removeCompleted = (task) => {
    const newCompletedList = completed.filter(item => item.name != task.name)
    setCompleted(newCompletedList)
   }

  return (
    <TasksContext.Provider
      value={{
        addingTask,
        setAddingTask,
        tasks,
        addToTasks,
        completed,
        addToCompleted,
        removeCompleted,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export default TasksContext
export {TasksProvider}