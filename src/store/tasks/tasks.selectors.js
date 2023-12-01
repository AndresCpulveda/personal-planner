import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectTodaysDate } from "../days/days.selectors";

const selectSelectedDay = (state) => state.days.selectedDay

const selectTasksReducer = (state) => state.tasks

export const selectTasksTasks = createSelector(
  [selectTasksReducer],
  (tasksSlice) => tasksSlice.tasks
)

export const selectTodayDueTasks = createSelector(
  [selectTasksTasks, selectSelectedDay],
  (allTasks, day) => allTasks.filter(task => {
    const modifiedTask = {...task, due: task.due.split('T')[0]}
    if(modifiedTask.due == day && !modifiedTask.completed) {
      return modifiedTask
    }
  })
)