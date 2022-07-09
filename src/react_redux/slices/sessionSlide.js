import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSession: false,
    user: null
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers : {
        updateSession: (state, {payload: {session, user}}) => {
            state.isSession = true;
            state.user = user;
        },
        removeSession: (state) => {
            state.session = false;
            state.user = null;
        }
    }
}
);

export const {updateSession,removeSession} = sessionSlice.actions;