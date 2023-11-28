import moment from "moment";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todaysDate: moment().format('yyyy-MM-DD').concat('', 'T00:00:00.000Z'), //TO USE AS DEFAULT VALUE OF "DUE DATE" FIELD,
  selectedDay: () => this.todaysDate.split('T')[0]
}

export const daysSlice = createSlice({
  name: 'day',
  initialState,
  reducers: {
    changeSelectedDay: (state, action) => {
      state.selectedDay = action.payload
    }
  }
})

export const {changeSelectedDay} = daysSlice.actions;
export default daysSlice.reducer;