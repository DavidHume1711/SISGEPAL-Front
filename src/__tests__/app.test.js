import React from 'react';
import App from '../components/App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {initialStateSession} from '../react_redux/slices/sessionSlide'
import {initialStateProveedor} from '../react_redux/slices/proveedorSlice'
import {initialStateProducto} from '../react_redux/slices/productoSlice'
import {initialStateEmpleado} from '../react_redux/slices/empleadoSlice'
import {render, screen,cleanup} from '@testing-library/react'
import jwtDecode from "jwt-decode";
const initialState = {
    session: initialStateSession,
    empleado: initialStateEmpleado,
    proveedor: initialStateProveedor,
    producto: initialStateProducto
}
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0IiwiY29ycmVvIjoibWF0ZW8uYWxleGFuZGVyQGNvcnJlb3VuaXZhbGxlLmVkdS5jbyIsInVzdWFyaW8iOiJtYXRlby5hbGV4YW5kZXIiLCJleHAiOjE2NTkzODc4NzgsIm5vbWJyZSI6Ik1hdGVvIEFsZXhhbmRlciIsImlhdCI6MTY1OTM4NDI3OCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9BRE1JTiJdfQ.6ozsHGjdW-mv1xfTh1GrFQN73RE7PxfweX4-hwyCsk8";
const user = jwtDecode(token);
const initialState2 = {
    session: {isSession: true, user: user},
    empleado: initialStateEmpleado,
    proveedor: initialStateProveedor,
    producto: initialStateProducto
}

describe('Renderizar sin errores', () => {
    const mockStore = configureStore();
    let store;
    afterEach(cleanup)
    it('Renderizar login"', async () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const container = await screen.findAllByTestId("container-login");
        
        expect(container).not.toBeUndefined();
    });

    it('Renderizar pantalla principal"', async () => {
        render(
            <Provider store={mockStore(initialState2)}>
                <App />
            </Provider>
        );
        const text = await screen.findAllByText("PAPELERÍA SAS");
        expect(text).toHaveLength(1);
    });

    it('Verificar datos del usuario"',  () => {
        render(
            <Provider store={mockStore(initialState2)}>
                <App />
            </Provider>
        );
        const user_nombre =  screen.getByTestId("user_nombre").textContent ;
        const user_username =  screen.getByTestId("user_username").textContent ;
        const user_correo =  screen.getByTestId("user_correo").textContent ;
        const {usuario,nombre,correo} = user;
        expect(user_nombre).toEqual(nombre);
        expect(user_username).toEqual(usuario);
        expect(user_correo).toEqual(correo);
    });
});