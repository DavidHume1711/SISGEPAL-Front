import { configureStore } from '@reduxjs/toolkit'
import { sessionSlice } from './slices/sessionSlide';
import { empleadoSlice } from './slices/empleadoSlice'; 

const store = configureStore({ reducer: {
    session: sessionSlice.reducer,
    empleado: empleadoSlice.reducer
} });

export default store;