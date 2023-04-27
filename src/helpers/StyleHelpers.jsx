export const formatPriority = (priority) => {
  if(priority === 'Low') {
    return 'text-yellow-400'
  }
  if(priority === 'Medium') {
    return 'text-orange-500'
  }
  return 'text-red-500'
}

export const stylePriority = (priority) => {
  if(priority === 'Low') {
    return "text-yellow-500 bg-yellow-100"
  }
  if(priority === 'Medium') {
    return "text-orange-500 bg-orange-100"
  }
  return "text-red-600 bg-red-100"
}