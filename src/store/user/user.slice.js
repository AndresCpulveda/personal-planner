import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetUser: (state, action) => {
      state.user = initialState.user;
      state.token = initialState.token;
    },
  },
});

export const { setUser, setToken, resetUser } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
