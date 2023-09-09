import { useContext } from "react";
import daysContext from "../context/dayProvider";

function useDays() {
  return (
    useContext(daysContext)
  )
}

export default useDays