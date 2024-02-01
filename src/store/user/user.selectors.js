import { createSelector } from "@reduxjs/toolkit";

const selectUserSlice = (state) => state.user;

export const selectUserUser = createSelector(
  [selectUserSlice],
  (userSlice) => userSlice.user,
);

export const selectUserId = createSelector(
  [selectUserUser],
  (userUser) => userUser.id,
);

// export const selectIsAuthenticated = createSelector(
//   [selectUserSlice],
//   (userSlice) => userSlice.isAuthenticated,
// );

export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
