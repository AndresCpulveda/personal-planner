import { buildAction } from "../../utils/reducer/reducer.utils"
import { changeSelectedDay } from "./days.reducer"

export const changeSelectedDay = (selectedDay) => {
  return buildAction(changeSelectedDay, selectedDay)
}