import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
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
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    resetUser: (state, action) => {
      state.user = initialState.user;
      state.token = initialState.token;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setToken, setIsAuthenticated, resetUser } =
  userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
