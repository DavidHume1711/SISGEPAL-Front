import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSession: false,
    user: null
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers : {
        updateSession: (state, {payload: {isSession, user}}) => {
            state.isSession = true;
            state.user = user;
        },
        removeSession: (state) => {
            state.isSession = false;
            state.user = null;
        }
    }
}
);

export const {updateSession,removeSession} = sessionSlice.actions;