import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {initialStateSession} from '../react_redux/slices/sessionSlide'
import {initialStateProveedor} from '../react_redux/slices/proveedorSlice'
import {initialStateCliente} from '../react_redux/slices/clienteSlice'
import {initialStateProducto} from '../react_redux/slices/productoSlice'
import {initialStateEmpleado} from '../react_redux/slices/empleadoSlice'

const initialState = {
    session: initialStateSession,
    empleado: initialStateEmpleado,
    proveedor: initialStateProveedor,
    producto: initialStateProducto
}

describe('With React Testing Library', () => {
    const mockStore = configureStore();
    let store;

    it('Shows "Hello world!"', () => {
        store = mockStore(initialState);
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(true).toBeTruthy();
    });
});