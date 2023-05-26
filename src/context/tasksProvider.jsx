import { createContext, useState, useEffect } from "react";

import sendAxios from "../../config/axios";
import { dateFormatter, dateDeFormatter, getTodaysDate, extractRecentRecurrings, createRecurrings } from "../helpers/helpers";

const TasksContext = createContext()

function TasksProvider({children}) {

  const [addingTodayTask, setAddingTodayTask] = useState(false)
  const [todayDueTasks, setTodayDueTasks] = useState([])
  const [todayCompleted, setTodayCompleted] = useState([])
  const [todaysTasks, setTodaysTasks] = useState([])
  const [loadedTasks, setLoadedTasks] = useState(false)
  const [allTasks, setAllTasks] = useState([])

  useEffect(() => {
    console.log('render');
    const getAllTasks = async () => {
      try {
        const {data} = await sendAxios('tasks/all')
        const formatted = data.map(task => {
          task.due = dateFormatter(task.due)
          task.createdAt = dateFormatter(task.createdAt)
          return task
        })
        const currentRecurrings = extractRecentRecurrings(formatted)
        const newRecurrings = createRecurrings(currentRecurrings)
        const savedRecurrings = newRecurrings.map(task => {
          const saved = addToTasks(task)
          saved.then(res => formatted.push(res))
          return saved
        })
        const toAdd = formatted
        setAllTasks(toAdd)
        setLoadedTasks(true)
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
        const formatted = data.map( task => { //Formats all the dates before saving to states array
          task.due = dateFormatter(task.due)
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
  }, [allTasks])

  const addToTasks = async (task) => { //COMPLETES THE TASK OBJECT AND SENDS IT TO THE BACKEND
    console.log(task);
    if(task.due.includes('-')) {
      const newDue = dateFormatter(task.due)
      task.due = newDue
    }
    const toAdd = {
      ...task,
      completed: false,
      stopWatch: task.time === 0
    }
    console.log(toAdd);
    try {
      const {data} = await sendAxios.post('tasks/add', toAdd)
      console.log(data)
      const fixedDue = data.due.split('T')[0] //CUTS THE DATE FOR COMPARISON
      data.due = fixedDue
      const todaysDate = dateFormatter(getTodaysDate()) //GETS TODAYS DATE FOR COMPARISON
      data.due = dateFormatter(data.due) //FORMATS DATE BEFORE SAVING
      if(todaysDate === data.due) {
        setTodayDueTasks([...todayDueTasks, data]) //SAVES OBJECT IN TODAYS TASKS ARRAY WITH THE DESIRED FORMAT
      }
      return data
    } catch (error) {
      console.log(error);
    }
   }

   const addToCompleted = async (task) => {
    const newDueList = todayDueTasks.filter(due => due.name != task.name)
    setTodayDueTasks(newDueList)
    try {
      const {data} = await sendAxios.put('tasks/update', task)
      data.due = dateFormatter(data.due)
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
    if(task.due.includes('-')) {
      const newDue = dateFormatter(task.due)
      task.due = newDue
    }
    // task.due = getTodaysDate()

    try {
      const {data} = await sendAxios.put('tasks/update', task)
    } catch (error) {
      console.log(error);
    }
   }

   const getCategories = () => {
    console.log('sip');
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