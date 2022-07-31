import { getAPI } from "./api";
import { getToken } from "../utils";

const doPromiseAfterFetch = async (response) => {
  return new Promise((resolver, reject) => {
    return response.json().then((data) => {
      const { status } = response;
      const responseFilter = { status, data };
      resolver(responseFilter);
    });
  });
};

export const doLoginRequest = async (loginDTO) => {
  const api = getAPI();
  console.log(api);
  const url = api.url + api.endpoints.session;
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDTO),
  };
  return fetch(url, config)
    .then((response) => response.json())
    .then((json) => json);
};

export const doGetEmpleadosRequest = async () => {
  const api = getAPI();
  const url = api.url + api.endpoints.empleados;
  const config = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  };
  return fetch(url, config)
    .then((response) => doPromiseAfterFetch(response))
    .catch((e) => console.log("ERROR EN GET EMPLEADOS REQUEST"));
};

export const doPutEmpleadosRequest = async (empleado_id, empleadoDTO) => {
  const api = getAPI();
  const url = api.url + api.endpoints.empleados + `/${empleado_id}`;
  const config = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(empleadoDTO),
  };
  return fetch(url, config)
    .then((response) => doPromiseAfterFetch(response))
    .catch((e) => console.log("ERROR EN PUT EMPLEADOS REQUEST"));
};

export const doPostEmpleadosRequest = async (empleadoDTO) => {
  const api = getAPI();
  const url = api.url + api.endpoints.empleados;
  const config = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(empleadoDTO),
  };
  return fetch(url, config)
    .then((response) => doPromiseAfterFetch(response))
    .catch((e) => console.log("ERROR EN POST EMPLEADOS REQUEST"));
};

export const doDeleteEmpleadoRequest = async (empleado_id) => {
  const api = getAPI();
  const url = api.url + api.endpoints.empleados + `/${empleado_id}`;
  const config = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  };
  return fetch(url, config)
    .then((response) => doPromiseAfterFetch(response))
    .catch((e) => console.log("ERROR EN DELETE EMPLEADOS REQUEST"));
};

export const doGetProveedoresRequest = async () => {
  const api = getAPI();
  const url = api.url + api.endpoints.proveedores;
  const config = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  };
  return fetch(url, config)
    .then((response) => doPromiseAfterFetch(response))
    .catch((e) => console.log("ERROR EN GET PROVEEDORES REQUEST"));
};

export const doPutProveedoresRequest = async (proveedor_id, proveedorDTO) => {
  const api = getAPI();
  const url = api.url + api.endpoints.proveedores + `/${proveedor_id}`;
  const config = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proveedorDTO),
  };
  return fetch(url, config)
    .then((response) => doPromiseAfterFetch(response))
    .catch((e) => console.log("ERROR EN PUT PROVEEDORES REQUEST"));
};

export const doPostProveedoresRequest = async (proveedorDTO) => {
  const api = getAPI();
  const url = api.url + api.endpoints.proveedores;
  const config = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proveedorDTO),
  };
  return fetch(url, config)
    .then((response) => doPromiseAfterFetch(response))
    .catch((e) => console.log("ERROR EN POST PROVEEDORES REQUEST"));
};

export const doDeleteProveedoresRequest = async (proveedor_id) => {
  const api = getAPI();
  const url = api.url + api.endpoints.proveedores + `/${proveedor_id}`;
  const config = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  };
  return fetch(url, config)
    .then((response) => doPromiseAfterFetch(response))
    .catch((e) => console.log("ERROR EN DELETE PROVEEDORES REQUEST"));
};

export const doGetProductosRequest = async () => {
    const api = getAPI();
    const url = api.url + api.endpoints.productos;
    const config = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
    return fetch(url, config)
      .then((response) => doPromiseAfterFetch(response))
      .catch((e) => console.log("ERROR EN GET PRODUCTOS REQUEST"));
};

export const doPutProductosRequest = async (producto_id, productoDTO) => {
    const api = getAPI();
    const url = api.url + api.endpoints.productos + `/${producto_id}`;
    const config = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoDTO),
    };
    return fetch(url, config)
      .then((response) => doPromiseAfterFetch(response))
      .catch((e) => console.log("ERROR EN PUT PRODUCTOS REQUEST"));
};

export const doPostProductosRequest = async (productoDTO) => {
    const api = getAPI();
    const url = api.url + api.endpoints.productos;
    const config = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoDTO),
    };
    return fetch(url, config)
      .then((response) => doPromiseAfterFetch(response))
      .catch((e) => console.log("ERROR EN POST PRODUCTOS REQUEST"));
};
  
export const doDeleteProductosRequest = async (producto_id) => {
    const api = getAPI();
    const url = api.url + api.endpoints.productos + `/${producto_id}`;
    const config = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
    return fetch(url, config)
      .then((response) => doPromiseAfterFetch(response))
      .catch((e) => console.log("ERROR EN DELETE PRODUCTOS REQUEST"));
};

export const doGetClientesRequest = async () => {
    const api = getAPI();
    const url = api.url+api.endpoints.clientes;
    const config = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+getToken()
        }
    }
    return fetch(url, config)
        .then(
            (response) => doPromiseAfterFetch(response))
        .catch((e) => console.log("ERROR EN GET CLIENTE REQUEST"))
}

export const doPutClientesRequest = async (cliente_id, clienteDTO) => {
    const api = getAPI();
    const url = api.url+api.endpoints.clientes+`/${cliente_id}`;
    const config = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteDTO)
    }
    return fetch(url, config)
    .then(
        (response) => doPromiseAfterFetch(response))
    .catch((e) => console.log("ERROR EN PUT CLIENTE REQUEST"))
}

export const doPostClientesRequest = async (clienteDTO) => {
    const api = getAPI();
    const url = api.url+api.endpoints.clientes;
    const config = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer '+getToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteDTO)
    }
    return fetch(url, config)
    .then(
        (response) => doPromiseAfterFetch(response))
    .catch((e) => console.log("ERROR EN POST CLIENTE REQUEST"))
}

export const doDeleteClientesRequest = async (cliente_id) => {
    const api = getAPI();
    const url = api.url+api.endpoints.clientes+`/${cliente_id}`;
    const config = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer '+getToken()
        }
    }
    return fetch(url, config)
    .then(
        (response) => doPromiseAfterFetch(response))
    .catch((e) => console.log("ERROR EN DELETE CLIENTE REQUEST"))    
}
