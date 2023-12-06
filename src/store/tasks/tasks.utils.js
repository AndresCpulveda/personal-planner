export const modifyTask = (modifiedTask, tasksArray) => {
  const modifiedArray = tasksArray.map((iTask) => (
    iTask.id == modifiedTask.id ? modifiedTask : iTask
  ))
  return modifiedArray
}