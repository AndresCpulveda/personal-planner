import { createContext, useState } from "react"

export const dayContext = createContext()

const DayProvider = ({children}) => {

  const [selectedDay, setSelectedDay] = useState(todaysDate.split('T')[0])

  return (
    <dayContext.Provider
      value={{

      }}
    >
      {children}
    </dayContext.Provider>
  )
}

export default DayProvider