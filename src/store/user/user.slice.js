import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      state.user = action.payload
    },
  }
})

export const {setUser} = userSlice.actions
const userReducer = userSlice.reducer;
export default userReducer