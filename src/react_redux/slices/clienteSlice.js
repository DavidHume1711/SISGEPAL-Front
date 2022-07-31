import { createSlice } from "@reduxjs/toolkit";
import { getToken, decodeToken } from "../../utils";

export const initialStateCliente = {
    cliente_id: '',
    cedula: '',
    nombre: '',
    direccion: '',
    telefono: '',
    usuario: '',
    correo: ''
}
export const clienteSlice = createSlice({
    name: 'cliente',
    initialState: initialStateCliente,
    reducers : {
        updateCliente: (state, {payload: {cliente_id, cedula,nombre,direccion,telefono,correo,usuario}}) => {
            state.cliente_id = cliente_id;
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

export const {updateCliente} = clienteSlice.actions;