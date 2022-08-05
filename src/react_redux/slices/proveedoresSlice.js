import { createSlice } from "@reduxjs/toolkit";
import { getToken, decodeToken } from "../../utils";

export const initialStateProveedores = [];
export const proveedoresSlice = createSlice({
    name: 'proveedores',
    initialState: initialStateProveedores,
    reducers : {
        updateProveedores: (state, {payload: {proveedores}}) => {
            state.splice(0,state.length);
            proveedores.forEach(e => state.push(e));
            console.log("SE ACUTUALIZÓ LOS PROVEEDORES", proveedores)
        },
    }
}
);

export const {updateProveedores} = proveedoresSlice.actions;