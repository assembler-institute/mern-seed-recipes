import { createSelector } from "reselect";

export const selectUser = (state) => state.user;

export const currentUserSelector = createSelector(
  [selectUser],
  (user) => user.currentUser,
);

export const currentUserStateSelector = createSelector(
  [selectUser],
  (user) => user,
);
