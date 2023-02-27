export const formatPriority = (priority) => {
  if(priority === 'Low') {
    return 'text-yellow-400'
  }
  if(priority === 'Medium') {
    return 'text-orange-500'
  }
  return 'text-red-500'
}