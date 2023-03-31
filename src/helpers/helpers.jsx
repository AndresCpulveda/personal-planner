export function timeFormatter(timer) {
  let hours = `${Math.floor(timer / 3600)}`
  let minutes = `${Math.floor(timer / 60)}`;
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
  const deformattedDate = `${splitDate[2]} ${swappedMonths[splitDate[1]]} ${splitDate[0]}`
  const daysDate = dateAsDays(deformattedDate)
  return daysDate
}

export function sortPriority(list, boolean) { //OPTIMIZAR
  const sorted = list.sort((a, b) => {
    const priorityOrder = {High: 1, Medium: 2, Low: 3}
    if(!boolean) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }else {
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
  })
  return sorted
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

export function dateAsDays(date) {
  const dateArray = date.split(' ')
  const result = dateArray[0] * 365 + dateArray[1] * 30 + dateArray[2]
  return result
}

export function sortDueBoolean(list, boolean) { //OPTIMIZAR
  if(boolean) {
    const sorted = list.sort((a, b) => {
      const aAsNumb = dateDeFormatter(a.due)
      const bAsNumb = dateDeFormatter(b.due)
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
    const aAsNumb = dateDeFormatter(a.due)
    const bAsNumb = dateDeFormatter(b.due)
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
      const aAsNumb = dateDeFormatter(a.createdAt)
      const bAsNumb = dateDeFormatter(b.createdAt)
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
    const aAsNumb = dateDeFormatter(a.createdAt)
    const bAsNumb = dateDeFormatter(b.createdAt)
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