import { createContext, useState } from "react";

const TasksContext = createContext()

function TasksProvider({children}) {

  const [addingTodayTask, setAddingTodayTask] = useState(false)
  const [todayDueTasks, setTodayDueTasks] = useState([])
  const [todayCompleted, setTodayCompleted] = useState([])

   const addToDueTasks = (task) => {
    const toAdd = {
      ...task,
      completed: false
    }
    setTodayDueTasks([...todayDueTasks, toAdd])
   }

   const addToCompleted = (task) => {
    const newDueList = todayDueTasks.filter(due => due.name != task.name)
    setTodayDueTasks(newDueList)
    const toAdd = {
      ...task,
      completed: true
    }
    setTodayCompleted([toAdd, ...todayCompleted])
   }

   const removeCompleted = (task) => {
    const newCompletedList = todayCompleted.filter(completed => completed.name != task.name)
    setTodayCompleted(newCompletedList)
   }

  return (
    <TasksContext.Provider
      value={{
        addingTodayTask,
        setAddingTodayTask,
        todayDueTasks,
        addToDueTasks,
        todayCompleted,
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