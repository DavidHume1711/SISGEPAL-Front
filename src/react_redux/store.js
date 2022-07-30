import { configureStore } from '@reduxjs/toolkit'
import { sessionSlice } from './slices/sessionSlide';
import { empleadoSlice } from './slices/empleadoSlice';
import { clienteSlice } from './slices/clienteSlice'; 

const store = configureStore({ reducer: {
    session: sessionSlice.reducer,
    empleado: empleadoSlice.reducer,
    cliente: clienteSlice.reducer
} });

export default store;