import { configureStore } from "@reduxjs/toolkit";
import { sessionSlice } from "./slices/sessionSlide";
import { empleadoSlice } from "./slices/empleadoSlice";
import { proveedorSlice } from "./slices/proveedorSlice";

const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
    empleado: empleadoSlice.reducer,
    proveedor: proveedorSlice.reducer,
  },
});

export default store;
