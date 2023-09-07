import { createContext, useState, useEffect } from "react";
import moment from 'moment'

import sendAxios from "../../config/axios";
import {extractRecentRecurrings, createRecurrings, makeFormattedDate, toRawDate, toFormattedDate, todaysDate } from "../helpers/helpers";

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
        const currentRecurrings = extractRecentRecurrings(formatted)
        const newRecurrings = createRecurrings(currentRecurrings)
        const savedRecurrings = newRecurrings.map(task => {
          task.due = toRawDate(task.due)
          return saveTask(task)
        })
        Promise.all(savedRecurrings)
        .then(res => {
          const all = [...formatted, ...res]
          setAllTasks(all)
        })
      } catch (error) {
        console.log(error);
      }
    }
    getAllTasks()
  }, [])

  const getDaysTasks = async (day = todaysDate) => {
    const due = allTasks.filter(task => toRawDate(task.due) === day && !task.completed )
    setLoadedTasks(true)
    setTodayDueTasks(due)
    const completed = allTasks.filter(task => {
      if(task.completedAt && task.completedAt.split('T')[0] == day) {
        return true
      }
    })

    setTodayCompleted(completed)
  }
  
  useEffect(() => {
    getDaysTasks()
  }, [allTasks])
  
  
  useEffect(() => {
    const getTodays = async() => {
      const todayDue = todaysTasks.filter(task => !task.completed)
      setTodayDueTasks(todayDue)
    }
    getTodays()
  }, [todaysTasks])

  const saveTask = async (task) => {
    const toAdd = {
      ...task,
      completed: false,
      stopWatch: task.time === 0
    }
    try {
      const {data} = await sendAxios.post('tasks/add', toAdd)
      data.due = makeFormattedDate(data.due)
      return data
    } catch (error) {
      console.log(error);
      alert(error)
    }
  }

  const addToTasks = async (task) => { //COMPLETES THE TASK OBJECT AND SENDS IT TO THE BACKEND
    const toAdd = {
      ...task,
      completed: false,
      stopWatch: task.time === 0
    }
    setAllTasks([...allTasks, toAdd])
    try {
      const {data} = await sendAxios.post('tasks/add', toAdd)
      data.due = makeFormattedDate(data.due)
      const formattedTodays = makeFormattedDate()
      if(formattedTodays === data.due) {
        setTodayDueTasks([...todayDueTasks, data]) //SAVES OBJECT IN TODAYS TASKS ARRAY WITH THE DESIRED FORMAT
      }
      return data
    } catch (error) {
      console.log(error);
      alert(error)
    }
   }

   const addToCompleted = async (task) => {
    const newDueList = todayDueTasks.filter(due => due.id != task.id)
    setTodayDueTasks(newDueList)
    task.completedAt = todaysDate
    setTodayCompleted([...todayCompleted, task])
    task.due = toRawDate(task.due)

    try {
      const {data} = await sendAxios.put('tasks/update', task)
      return data
    } catch (error) {
      console.log(error);
      alert(error)
    }
   }

   const deleteTask = async (task) => {
     if(task.completed) {
       const newCompletedList = todayCompleted.filter(item => item.id != task.id)
       setTodayCompleted(newCompletedList)
     }else {
       console.log(todayDueTasks);
       const newDueList = todayDueTasks.filter(item => item.id != task.id)
       setTodayDueTasks(newDueList)
     }
    try {
      const {data} = await sendAxios.delete(`tasks/delete/${task._id}`)
      return data
    } catch (error) {
      console.log(error);
      alert(error)
    }
   }

   const updateTask = async (task) => {
    if(task.completed) {
      const newCompletedList = todayCompleted.map(item => item.id === task.id ? task : item)
      setTodayCompleted(newCompletedList)
    }else {
      const newDueList = todayDueTasks.map(item => item.id === task.id ? task : item)
      setTodayDueTasks(newDueList)
    }
    try {
      const {data} = await sendAxios.put('tasks/update', task)
      return data
    } catch (error) {
      console.log(error);
      alert(error)
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
        deleteTask,
        loadedTasks,
        updateTask,
        allTasks,
        getCategories,
        getDaysTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export default TasksContext
export {TasksProvider}