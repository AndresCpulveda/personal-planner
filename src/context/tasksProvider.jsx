import { createContext, useState, useEffect } from "react";
import moment from 'moment'

import sendAxios from "../../config/axios";
import {extractRecentRecurrings, createRecurrings, makeFormattedDate, toRawDate, toFormattedDate } from "../helpers/helpers";

const TasksContext = createContext()

function TasksProvider({children}) {
  const [addingTodayTask, setAddingTodayTask] = useState(false)
  const [todayDueTasks, setTodayDueTasks] = useState([])
  const [todayCompleted, setTodayCompleted] = useState([])
  const [todaysTasks, setTodaysTasks] = useState([])
  const [loadedTasks, setLoadedTasks] = useState(false)
  const [allTasks, setAllTasks] = useState([])

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const {data} = await sendAxios('tasks/all')
        const formatted = data.map(task => {
          task.due = makeFormattedDate(task.due)
          return task
        })
        setAllTasks(formatted)
      } catch (error) {
        console.log(error);
      }
    }
    getAllTasks()
  }, [])

  useEffect(() => {
    const getTodaysTasks = async () => {
      try {
        const {data} = await sendAxios('tasks/todays')
        const formatted = data.map(task => {
          task.due = makeFormattedDate(task.due)
          return task
        })
        const currentRecurrings = extractRecentRecurrings(allTasks)
        const newRecurrings = createRecurrings(currentRecurrings)
        const savedRecurrings = newRecurrings.map(task => {
          task.due = toRawDate(task.due)
          const saved = addToTasks(task)
          saved.then(res => formatted.push(res))
          return saved
        })
        setLoadedTasks(true)
        setTodaysTasks(formatted)
      } catch (error) {
        console.log(error);
      }
    }
    getTodaysTasks()
  }, [allTasks])


  useEffect(() => {
    const getTodaysDue = () => {
      const todayDue = todaysTasks.filter(task => !task.completed)
      setTodayDueTasks(todayDue)
    }
    const getTodaysCompleted = () => {
      const listCompleted = todaysTasks.filter(task => task.completed)
      setTodayCompleted(listCompleted)
    }
    getTodaysDue()
    getTodaysCompleted()
  }, [todaysTasks])

  const addToTasks = async (task) => { //COMPLETES THE TASK OBJECT AND SENDS IT TO THE BACKEND
    const toAdd = {
      ...task,
      completed: false,
      stopWatch: task.time === 0
    }
    try {
      const {data} = await sendAxios.post('tasks/add', toAdd)
      data.due = makeFormattedDate(data.due)
      const formattedTodays = makeFormattedDate()
      if(formattedTodays === data.due) {
        setTodayDueTasks([...todayDueTasks, data]) //SAVES OBJECT IN TODAYS TASKS ARRAY WITH THE DESIRED FORMAT
      }
      setAllTasks([...allTasks, data])
      return data
    } catch (error) {
      console.log(error);
    }
   }

   const addToCompleted = async (task) => {
    const newDueList = todayDueTasks.filter(due => due.name != task.name)
    setTodayDueTasks(newDueList)
    task.due = toRawDate(task.due)
    try {
      const {data} = await sendAxios.put('tasks/update', task)
      data.due = toFormattedDate(data.due)
      setTodayCompleted([...todayCompleted, data])
    } catch (error) {
      console.log(error);
    }
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

   const updateTask = async (task) => {
    task.due = toRawDate(task.due)

    try {
      const {data} = await sendAxios.put('tasks/update', task)
    } catch (error) {
      console.log(error);
    }
   }

   const getCategories = () => {
    const categories = []
    for (let i = 0; i < allTasks.length; i++) {
      const exists = categories.find(category => category === allTasks[i].category)
      if(!exists) {
        if(allTasks[i].category !== ''){
          categories.push(allTasks[i].category)
        }
      }
    }
    return categories
  }

  return (
    <TasksContext.Provider
      value={{
        setTodaysTasks,
        todaysTasks,
        addingTodayTask,
        setAddingTodayTask,
        todayDueTasks,
        addToTasks,
        todayCompleted,
        addToCompleted,
        removeCompleted,
        loadedTasks,
        updateTask,
        allTasks,
        getCategories,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export default TasksContext
export {TasksProvider}