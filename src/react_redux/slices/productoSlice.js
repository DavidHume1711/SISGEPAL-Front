import { createSlice } from "@reduxjs/toolkit";
import { getToken, decodeToken } from "../../utils";

const initialState = {
  producto_id: "",
  codigo_producto: "",
  proveedor_id: "",
  nombre: "",
  stock: "",
  precio: "",
};


export const productoSlice = createSlice({
    name: "producto",
    initialState,
    reducers: {
      updateProducto: (
        state,
        { payload: { producto_id, codigo_producto, proveedor_id, nombre, stock, precio } }
      ) => {
        state.producto_id = producto_id;
        state.codigo_producto = codigo_producto;
        state.proveedor_id = proveedor_id;
        state.nombre = nombre;
        state.stock = stock;
        state.precio = precio;
      },
    },
  });
  
  export const { updateProducto } = productoSlice.actions;
  