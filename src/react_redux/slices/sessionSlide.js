import { createSlice } from "@reduxjs/toolkit";
import { getToken, decodeToken } from "../../utils";
const setInitialState = () => {
  const token = getToken();
  const isSession = token != null;
  return {
    isSession,
    user: isSession ? decodeToken(token) : null,
  };
};
export const initialStateSession = setInitialState();
export const sessionSlice = createSlice({
  name: "session",
  initialState: initialStateSession,
  reducers: {
    updateSession: (state, { payload: { isSession, user } }) => {
      state.isSession = true;
      state.user = user;
    },
    removeSession: (state) => {
      state.isSession = false;
      state.user = null;
    },
  },
});

export const { updateSession, removeSession } = sessionSlice.actions;
