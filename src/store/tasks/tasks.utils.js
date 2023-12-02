export const modifyCompletedTask = (modifiedTask, tasksArray) => {
  const modifiedArray = tasksArray.map((iTask) => (
    iTask.id == modifiedTask.id ? modifiedTask : iTask
  ))
  return modifiedArray
}

export const actionSetAllTasks = (allTasks) => {
  setAllTasks(allTasks)
}