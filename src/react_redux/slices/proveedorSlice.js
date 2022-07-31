import { createSlice } from "@reduxjs/toolkit";
import { getToken, decodeToken } from "../../utils";

const initialState = {
  proveedor_id: "",
  nit: "",
  nombre: "",
  direccion: "",
  telefono: "",
  //usuario: "",
  correo: "",
};
export const proveedorSlice = createSlice({
  name: "proveedor",
  initialState,
  reducers: {
    updateProveedor: (
      state,
      { payload: { proveedor_id, nit, nombre, direccion, telefono, correo } }
    ) => {
      state.proveedor_id = proveedor_id;
      state.nit = nit;
      state.nombre = nombre;
      state.direccion = direccion;
      state.telefono = telefono;
      state.correo = correo;
      //state.usuario = usuario;
    },
  },
});

export const { updateProveedor } = proveedorSlice.actions;
