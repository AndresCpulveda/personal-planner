export function getTodaysDate() {
  const currentDate = new Date
  const offset = currentDate.getTimezoneOffset();
  const settedDated = currentDate.setMinutes(currentDate.getMinutes() - offset)
  const theDate = new Date(settedDated)
  return theDate.toISOString().split('T')[0]
}

export function timeFormatter(timer) {
  if(timer < 0) {
    return '00:00:00'
  }
  let hours = `${Math.floor(timer / 3600)}`
  let minutes = `${Math.floor((timer - hours * 3600) / 60)}`;
  let seconds = `0${timer % 60}`.slice(-2);
  if(timer < 599) {
    return `0${hours}:0${minutes}:${seconds}`;
  }
  return `0${hours}:${minutes}:${seconds}`
}

export function timeDeFormatter(timer) {
  const seconds = Number(timer.split(':')[2])
  const minutes = Number(timer.split(':')[1])
  const hours = Number(timer.split(':')[0])
  return hours * 3600 + minutes * 60 + seconds
}

const months = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
}

export function dateFormatter(date) {
  const splitDate = date.split('T')[0];
  const dateArray = splitDate.split('-');
  const formattedDate = `${dateArray[2]} ${months[dateArray[1]]} ${dateArray[0]}`
  return formattedDate
}

export function dateDeFormatter(date) {
  let swappedMonths = {}

  for(let key in months) {
    swappedMonths[months[key]] = key
  }

  const splitDate = date.split(' ');
  const deformattedDate = `${splitDate[2]}-${swappedMonths[splitDate[1]]}-${splitDate[0]}`
  return deformattedDate
}

export function addMonths(latestDue, addition) {
  const date = daysToDate(latestDue)
  
  let swappedMonths = {}
  
  for(let key in months) {
    swappedMonths[months[key]] = key
  }
  
  const splitDate = date.split('-')
  const monthNum = splitDate[1]
  const newMonth = months[`0${(parseInt(monthNum) + addition)}`]
  const result = `${splitDate[2]} ${newMonth} ${splitDate[0]}`
  return result

}

export function dateAsDays(date) {
  const dateArray = date.split('-')
  const result = parseInt(dateArray[0]) * 365 + parseInt(dateArray[1]) * 30 + parseInt(dateArray[2])
  return result
}

export function daysToDate(days) {
  const year = Math.floor(days / 365)
  const month = Math.floor(days % 365 / 30)
  const day = days - ((year * 365) + (month * 30))
  if(month < 10) {
    return `${year}-0${month}-${day}`
  }else {
    return `${year}-${month}-${day}`
  }
}


export function sortPriority(list, boolean) { //OPTIMIZAR
  const completed = list.filter( task => task.completed)
  const uncompleted = list.filter( task => !task.completed)
  const sorted = uncompleted.sort((a, b) => {
    const priorityOrder = {High: 1, Medium: 2, Low: 3}
    if(boolean) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }else {
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
  })
  let result;
  if(boolean) {
    result = [...sorted, ...completed]
  }else{
    result = [...completed, ...sorted]
  }
  return result
}

export function sortByBoolean(list, boolean){ //OPTIMIZAR
  if(boolean) {
    const sorted = list.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      if(nameA > nameB) {
        return -1
      }
      if(nameA < nameB) {
        return 1
      }
      return 0
    })
    return sorted
  } else {
    const sorted = list.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      if(nameA > nameB) {
        return 1
      }
      if(nameA < nameB) {
        return -1
      }
      return 0
    })
    return sorted
  }
}

export function sortDueBoolean(list, boolean) { //OPTIMIZAR
  if(boolean) {
    const sorted = list.sort((a, b) => {
      const aAsNumb = dateAsDays(dateDeFormatter(a.due))
      const bAsNumb = dateAsDays(dateDeFormatter(b.due))
      if(aAsNumb > bAsNumb) {
        return -1
      }
      if(aAsNumb < bAsNumb) {
        return 1
      }
      return 0
    })
    return sorted
  }
  const sorted = list.sort((a, b) => {
    const aAsNumb = dateAsDays(dateDeFormatter(a.due))
    const bAsNumb = dateAsDays(dateDeFormatter(b.due))
    if(aAsNumb < bAsNumb) {
      return -1
    }
    if(aAsNumb > bAsNumb) {
      return 1
    }
    return 0
  })
  return sorted
}

export function sortCreatedBoolean(list, boolean) { //OPTIMIZAR
  if(boolean) {
    const sorted = list.sort((a, b) => {
      const aAsNumb = dateAsDays(dateDeFormatter(a.createdAt))
      const bAsNumb = dateAsDays(dateDeFormatter(b.createdAt))
      if(aAsNumb > bAsNumb) {
        return -1
      }
      if(aAsNumb < bAsNumb) {
        return 1
      }
      return 0
    })
    return sorted
  }
  const sorted = list.sort((a, b) => {
    const aAsNumb = dateAsDays(dateDeFormatter(a.createdAt))
    const bAsNumb = dateAsDays(dateDeFormatter(b.createdAt))
    if(aAsNumb < bAsNumb) {
      return -1
    }
    if(aAsNumb > bAsNumb) {
      return 1
    }
    return 0
  })
  return sorted
}

export function sortTime(list, boolean) {  
  const sorted = list.sort((a, b) => {
    const aTime = timeDeFormatter(a.time)
    const bTime = timeDeFormatter(b.time)
    if(boolean) {
      if(aTime < bTime) {
        return -1
      }
      if(aTime > bTime) {
        return 1
      }
      return 0
    } else {
      if(aTime > bTime) {
        return -1
      }
      if(aTime < bTime) {
        return 1
      }
      return 0
    }
  })
  return sorted
}

export function sortCategory(list, boolean) {
  const sorted = list.sort((a,b) => {
    if(boolean) {
      if (a.category > b.category) {
        return 1;
      }
      if (a.category < b.category) {
        return -1;
      }
      return 0;
    }else {
      if (a.category > b.category) {
        return -1;
      }
      if (a.category < b.category) {
        return 1;
      }
      return 0;
    }
  })
  return sorted;
}

export function extractRecentRecurrings(list) {
  const filtered = list.filter( task => task.isRecurring) //Extract only the tasks which are recurring
  const recurrings = filtered.reduce((acc, cur) => { //Use reduce to iterate each of the array elements while saving in the array accumulator the desired elements (initial value set to [] so the acc is considered an array)
    const alreadyExists = acc.find( task => task.name === cur.name) //Check if the iterating element already exists in the array accumulator
    
    if(!alreadyExists) { //If not already in the acc the it is added
      const clone = {...cur}
      acc.push(clone)
    }else {
      //Transform the dates to numbers so they can be compared
      const aAsNum = dateAsDays(dateDeFormatter(alreadyExists.due))
      const bAsNum = dateAsDays(dateDeFormatter(cur.due))
      if(aAsNum < bAsNum) { //If already in the acc then check if its due value is greater than the interating elements due value
        alreadyExists.due = cur.due //If iterating element has greater value, previously saved elements due value is updated
      }
    }
    return acc //Return the accumulated array with unrepeated tasks and each tasks has the greatest due value
  }, [])
  return recurrings
}

export function createRecurrings(list) {
  const increments = { //Create an object with the equivalent increments of days for each intervalUnit
    days: 1,
    weeks: 7,
  }
  const todayAsDays = dateAsDays(getTodaysDate()) //Save todays date in a constant variable for comparisson

  const toCreate = list.filter(task => dateAsDays(dateDeFormatter(task.due)) < todayAsDays) //Filter out all the tasks which its due date is further than todays date

  const tasksToAdd = toCreate.map(task => { //Use map to iterate on each task to be cloned
    const {name, priority, isRecurring, intervalUnit, frequencyInterval, category, time} = task //Destructure object of task
    let latestDue = parseInt(dateAsDays(dateDeFormatter(task.due))) //Calculate (in days) the due date of the task (which is the task with the latest due date)
    let newTasks = [] //Array where the tasks to be created will be stored
    do {
      let newDueDays; ////Variable where the new due date of each task being created will be stored (as days)
      if(intervalUnit === 'months') { //If the tasks interval unit is months we have to add months instead of days (cause every month has different amount of days)
        const newDueString = addMonths(latestDue, frequencyInterval) //Create a new date with the corresponding amount of months added (as a string formatted date)
        newDueDays = dateAsDays(dateDeFormatter(newDueString)) //The new due date for the task being created (as days for future comparisson)
      }else{
        newDueDays = latestDue + (increments[intervalUnit] * frequencyInterval) //If the tasks interval unit is not months, calculate the increment in days and add it to the last due date
      }
      const newDue = dateFormatter(daysToDate(newDueDays)) //Formatt (to string date) the newDue date of the task being created so it is saved ready to show in the UI
      const newTask = { //CREATE TASK OBJECT TO BE SENT
        name, due: newDue, priority, isRecurring, intervalUnit, frequencyInterval, category, time: timeDeFormatter(time)
      }
      newTasks.push(newTask) //Push the created task to the array
      latestDue = newDueDays //Update the latestDue to the due date of the task recently created
    } while (latestDue < todayAsDays); //Check if todays date is further in time than the latestDue so we know if more tasks must be created
    return newTasks
  })
  return tasksToAdd.flat()
}