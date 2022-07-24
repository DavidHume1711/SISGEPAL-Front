import { createSlice } from "@reduxjs/toolkit";
import { getToken, decodeToken } from "../../utils";

const initialState = {
    empleado_id: '',
    cedula: '',
    nombre: '',
    direccion: '',
    telefono: '',
    usuario: '',
    correo: ''
}
export const empleadoSlice = createSlice({
    name: 'empleado',
    initialState,
    reducers : {
        updateEmpleado: (state, {payload: {empleado_id, cedula,nombre,direccion,telefono,correo,usuario}}) => {
            state.empleado_id = empleado_id;
            state.cedula = cedula;
            state.nombre = nombre;
            state.direccion = direccion;
            state.telefono = telefono;
            state.correo = correo;
            state.usuario = usuario;
        },
    }
}
);

export const {updateEmpleado} = empleadoSlice.actions;