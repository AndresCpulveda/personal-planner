import { createContext, useState } from "react";

import sendAxios from "../../config/axios";

const TasksContext = createContext()

function TasksProvider({children}) {

  const [addingTodayTask, setAddingTodayTask] = useState(false)
  const [todayDueTasks, setTodayDueTasks] = useState([])
  const [todayCompleted, setTodayCompleted] = useState([])

   const addToDueTasks = async (task) => {
    const toAdd = {
      ...task,
      completed: false
    }
    try {
      const {data} = await sendAxios.post('tasks/add', toAdd)
      const fixedDue = data.due.split('T')[0]
      data.due = fixedDue

      setTodayDueTasks([...todayDueTasks, data])
    } catch (error) {
      console.log(error);
    }
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