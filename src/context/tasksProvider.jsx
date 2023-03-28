import { createContext, useState, useEffect } from "react";

import sendAxios from "../../config/axios";

const TasksContext = createContext()

function TasksProvider({children}) {

  const [addingTodayTask, setAddingTodayTask] = useState(false)
  const [todayDueTasks, setTodayDueTasks] = useState([])
  const [todayCompleted, setTodayCompleted] = useState([])
  const [todaysTasks, setTodaysTasks] = useState([])
  const [loadedTasks, setLoadedTasks] = useState(false)
  const [allTasks, setAllTasks] = useState([])

  useEffect(() => {
    const getTodaysTasks = async () => {
      try {
        const {data} = await sendAxios('tasks/todays')
        const formatted = data.map( task => {
          const date = task.due.split('T')[0]  
          task.due = date;
          return task
        })
        setTodaysTasks(formatted)
      } catch (error) {
        console.log(error);
      }
    }
    getTodaysTasks()
  }, [])

  useEffect(() => {
    const getTodaysDue = async () => {
      const todayDue = todaysTasks.filter(task => !task.completed)
      setTodayDueTasks(todayDue)
    }
    const getTodaysCompleted = () => {
      const listCompleted = todaysTasks.filter(task => task.completed)
      setTodayCompleted(listCompleted)
    }
    getTodaysDue()
    getTodaysCompleted()
    setLoadedTasks(true)
  }, [todaysTasks])

  const getAllTasks = async () => {
    try {
      const {data} = await sendAxios('tasks/all')
      const formatted = data.map(task => {
        const due = task.due.split('T')[0]
        const date = task.createdAt.split('T')[0]
        task.due = due
        task.createdAt = date
        return task
      })
      setAllTasks(formatted)
    } catch (error) {
      console.log(error);
    }
  }


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

   const addToCompleted = async (task) => {
    const newDueList = todayDueTasks.filter(due => due.name != task.name)
    setTodayDueTasks(newDueList)
    try {
      const updated = await sendAxios.put('tasks/update', task)
    } catch (error) {
      console.log(error);
    }
    setTodayCompleted([...todayCompleted, task])
   }

   const removeCompleted = async (task) => {
    try {
      const {data} = await sendAxios.delete(`tasks/delete/${task._id}`)
      const newCompletedList = todayCompleted.filter(completed => completed.name != data.name)
      setTodayCompleted(newCompletedList)
    } catch (error) {
      console.log(error);
    }
   }

   const updateTime = async (task) => {
    try {
      const {data} = await sendAxios.put('tasks/update', task)
    } catch (error) {
      console.log(error);
    }

   }


  return (
    <TasksContext.Provider
      value={{
        setTodaysTasks,
        todaysTasks,
        addingTodayTask,
        setAddingTodayTask,
        todayDueTasks,
        addToDueTasks,
        todayCompleted,
        addToCompleted,
        removeCompleted,
        loadedTasks,
        updateTime,
        getAllTasks,
        allTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export default TasksContext
export {TasksProvider}