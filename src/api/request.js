import { getAPI } from "./api";
import endpoints from './endpoints.json'
import { getToken } from "../utils";

export const doLoginRequest = async (loginDTO) => {
    const api = getAPI();
    console.log(api);
    const url = api.url+api.endpoints.session;
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDTO)
    }
    return fetch(url, config)
        .then(response => response.json())
        .then(json => json)
}

export const doGetEmpleadosRequest = async () => {
    const api = getAPI();
    const url = api.url+api.endpoints.empleados;
    const config = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+getToken()
        }
    }
    return fetch(url, config)
        .then(response => response.json())
        .then(json => json)
}

export const doPutEmpleadosRequest = async (empleado_id, empleadoDTO) => {
    const api = getAPI();
    const url = api.url+api.endpoints.empleados+`/${empleado_id}`;
    const config = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(empleadoDTO)
    }
    return fetch(url, config)
        .then(response => response.json())
        .then(json => json)
}

export const doPostEmpleadosRequest = async (empleadoDTO) => {
    const api = getAPI();
    const url = api.url+api.endpoints.empleados;
    const config = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer '+getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(empleadoDTO)
    }
    return fetch(url, config)
        .then(response => response.json())
        .then(json => json)
}