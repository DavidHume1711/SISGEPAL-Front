import { configureStore } from '@reduxjs/toolkit'
import { sessionSlice } from './slices/sessionSlide';

const store = configureStore({ reducer: {
    session: sessionSlice.reducer
} });

export default store;