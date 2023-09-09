import { createContext, useState } from "react"
import moment from "moment";

const daysContext = createContext()

const date = moment();
const todaysDate = date.format('yyyy-MM-DD').concat('', 'T00:00:00.000Z') //TO USE AS DEFAULT VALUE OF "DUE DATE" FIELD

export const DaysProvider = ({children}) => {
  const [selectedDay, setSelectedDay] = useState(todaysDate.split('T')[0])

  return (
    <daysContext.Provider
      value={{
        selectedDay,
        setSelectedDay,
        todaysDate,
      }}
    >
      {children}
    </daysContext.Provider>
  )
}

export default daysContext