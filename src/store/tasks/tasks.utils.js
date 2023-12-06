export const modifyTask = (modifiedTask, tasksArray) => tasksArray.map(iTask => iTask.id == modifiedTask.id ? modifiedTask : iTask)

export const removeTask = (taskToRemove, tasksArray) => {
  return tasksArray.filter(iTask => {
    if(iTask.id == taskToRemove.id) {
      return
    }
    return iTask
  })
}