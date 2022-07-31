import "./proveedoresTabComponent.css";
import { useEffect } from "react";
import { useState } from "react";
import {
  doGetProveedoresRequest,
  doPutProveedoresRequest,
  doPostProveedoresRequest,
} from "../../api/request";
import ProveedoresTableComponent from "../proveedoresTableComponent/proveedoresTableComponent";
import { useSelector } from "react-redux";
import { connect } from "react-redux/es/exports";
import { updateProveedor } from "../../react_redux/slices/proveedorSlice";
import { removeSession } from "../../react_redux/slices/sessionSlide";
import { removeToken } from "../../utils";

const doUpdateProveedor = async (
  ev,
  setProveedores,
  updateProveedor,
  proveedor,
  removeSession
) => {
  const { proveedor_id, nit, nombre, correo, direccion, telefono } = proveedor;
  if (proveedor_id && nit && nombre && correo && direccion && telefono) {
    ev.preventDefault();

    const proveedor_dto = { nit, nombre, correo, direccion, telefono };
    doPutProveedoresRequest(proveedor_id, proveedor_dto).then(
      ({ status, data }) => {
        const { error } = data;
        if (!error) {
          getProveedores(setProveedores);
          alert(`SE ACTUALIZÓ EL PROVEEDOR CON ID ${proveedor_id}`);
          updateProveedor();
        } else {
          if (status === 403) {
            removeToken(removeSession);
            return;
          }

          alert(
            `OCURRIÓ EL SIGUIENTE ERROR. Código: ${status}. Error: ${error}`
          );
        }
      }
    );
  }
};

const doCreateProveedor = async (
  ev,
  setProveedores,
  updateProveedor,
  proveedor,
  removeSession
) => {
  const { nit, nombre, correo, direccion, telefono } = proveedor;

  if (nit && nombre && correo && direccion && telefono) {
    ev.preventDefault();

    const proveedor_dto = {
      nit,
      nombre,
      correo,
      direccion,
      telefono,
      //username: usuario,
    };
    doPostProveedoresRequest(proveedor_dto).then(({ status, data }) => {
      const { proveedor_id, error } = data;
      if (!error) {
        getProveedores(setProveedores);
        alert(`SE CRÉO EL PROVEEDOR Y LE FUE ASIGNADO EL ID ${proveedor_id}`);
        updateProveedor();
      } else {
        if (status === 403) {
          removeToken(removeSession);
          return;
        }

        alert(`OCURRIÓ EL SIGUIENTE ERROR. Código: ${status}. Error: ${error}`);
      }
    });
  }
};

const getProveedores = async (setProveedores, removeSession) => {
  doGetProveedoresRequest()
    .then(({ status, data }) => {
      const { proveedores, error } = data;
      if (!error) {
        if (proveedores) {
          setProveedores(proveedores);
        }
      } else {
        if (status === 403) {
          removeToken(removeSession);
          return;
        }

        alert(
          `OCURRIÓ UN ERROR INESPERADO. Código: ${status}. Error: ${error}`
        );
      }
    })
    .catch((e) => console.log(e));
};

const ProveedoresTabComponent = ({
  removeSession,
  updateProveedorNit,
  updateProveedorNombre,
  updateProveedorDireccion,
  updateProveedorTelefono,
  updateProveedorCorreo,
  //updateProveedorUsuario,
  updateProveedor,
}) => {
  const proveedor = useSelector((state) => state.proveedor);
  const [proveedores, setProveedores] = useState(null);
  const [newProveedor, setNewProveedor] = useState(false);

  useEffect(() => {
    getProveedores(setProveedores, removeSession);
  }, []);

  return (
    <>
      {proveedores ? (
        <ProveedoresTableComponent
          proveedores={proveedores}
          enable={!newProveedor}
          updateRows={() => {
            getProveedores(setProveedores, removeSession);
          }}
        ></ProveedoresTableComponent>
      ) : (
        <></>
      )}

      <div className="row mt-5 mx-0">
        <div className="col-6 p-0">
          <form
            onSubmit={(ev) => {
              newProveedor
                ? doCreateProveedor(
                    ev,
                    setProveedores,
                    updateProveedor,
                    proveedor,
                    removeSession
                  )
                : doUpdateProveedor(
                    ev,
                    setProveedores,
                    updateProveedor,
                    proveedor,
                    removeSession
                  );
            }}
          >
            <div className="row form-proveedores mx-0">
              {newProveedor ? (
                <></>
              ) : (
                <>
                  <div className="col-3 p-0">
                    <label htmlFor="id">ID</label>
                  </div>
                  <div className="col-9 p-0">
                    <input
                      id="proveedor_id"
                      type="text"
                      name="id"
                      value={proveedor.proveedor_id}
                      readOnly
                    />
                  </div>
                </>
              )}
              <div className="col-3 p-0">
                <label htmlFor="nit">Nit</label>
              </div>
              <div className="col-9 p-0">
                <input
                  id="proveedor_nit"
                  type="text"
                  name="nit"
                  value={proveedor.nit}
                  onChange={(ev) =>
                    updateProveedorNit(proveedor, ev.currentTarget.value)
                  }
                  required
                />
              </div>
              <div className="col-3 p-0">
                <label htmlFor="nombre">Nombre</label>
              </div>
              <div className="col-9 p-0">
                <input
                  id="proveedor_nombre"
                  type="text"
                  name="nombre"
                  value={proveedor.nombre}
                  onChange={(ev) =>
                    updateProveedorNombre(proveedor, ev.currentTarget.value)
                  }
                  required
                />
              </div>
              <div className="col-3 p-0">
                <label htmlFor="correo">Correo</label>
              </div>
              <div className="col-9 p-0">
                <input
                  id="proveedor_correo"
                  type="text"
                  name="correo"
                  value={proveedor.correo}
                  onChange={(ev) =>
                    updateProveedorCorreo(proveedor, ev.currentTarget.value)
                  }
                  required
                />
              </div>
              <div className="col-3 p-0">
                <label htmlFor="direccion">Direccion</label>
              </div>
              <div className="col-9 p-0">
                <input
                  id="proveedor_direccion"
                  type="text"
                  name="direccion"
                  value={proveedor.direccion}
                  onChange={(ev) =>
                    updateProveedorDireccion(proveedor, ev.currentTarget.value)
                  }
                  required
                />
              </div>
              <div className="col-3 p-0">
                <label htmlFor="telefono">Teléfono</label>
              </div>
              <div className="col-9 p-0">
                <input
                  id="proveedor_telefono"
                  type="text"
                  name="telefono"
                  value={proveedor.telefono}
                  onChange={(ev) =>
                    updateProveedorTelefono(proveedor, ev.currentTarget.value)
                  }
                  required
                />
              </div>
              {newProveedor ? (
                <>
                  {/* 
                  <div className="col-3 p-0">
                    <label htmlFor="usuario">Usuario</label>
                  </div>
                  <div className="col-9 p-0">
                    <input
                      id="proveedor_usuario"
                      type="text"
                      name="usuario"
                      value={proveedor.usuario}
                      onChange={(ev) =>
                        updateProveedorUsuario(
                          proveedor,
                          ev.currentTarget.value
                        )
                      }
                      required
                    />
                  </div> */}
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="mt-3">
              <button
                className="btn-action"
                onClick={(ev) => {
                  console.log("EV");
                  newProveedor
                    ? doCreateProveedor(
                        ev,
                        setProveedores,
                        updateProveedor,
                        proveedor,
                        removeSession
                      )
                    : doUpdateProveedor(
                        ev,
                        setProveedores,
                        updateProveedor,
                        proveedor,
                        removeSession
                      );
                }}
              >
                {newProveedor ? "Crear" : "Guardar cambios"}
              </button>
            </div>
          </form>
        </div>
        <div className="col-6 d-flex align-items-center">
          <div className="d-flex flex-column gap-3">
            <div>
              <button
                className="btn-action"
                onClick={(ev) => {
                  updateProveedor();
                  setNewProveedor(!newProveedor);
                }}
              >
                {newProveedor ? "Editar proveedor" : "Nuevo proveedor"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapToDispatchToProps = (dispatch) => {
  return {
    removeSession: () => {
      dispatch(removeSession());
    },
    updateProveedorId: (proveedor, value) => {
      const newProveedorState = { ...proveedor };
      newProveedorState.proveedor_id = value;
      dispatch(updateProveedor(newProveedorState));
    },
    updateProveedorNit: (proveedor, value) => {
      const newProveedorState = { ...proveedor };
      newProveedorState.nit = value;
      dispatch(updateProveedor(newProveedorState));
    },
    updateProveedorNombre: (proveedor, value) => {
      const newProveedorState = { ...proveedor };
      newProveedorState.nombre = value;
      dispatch(updateProveedor(newProveedorState));
    },
    updateProveedorDireccion: (proveedor, value) => {
      const newProveedorState = { ...proveedor };
      newProveedorState.direccion = value;
      dispatch(updateProveedor(newProveedorState));
    },
    updateProveedorTelefono: (proveedor, value) => {
      const newProveedorState = { ...proveedor };
      newProveedorState.telefono = value;
      dispatch(updateProveedor(newProveedorState));
    },
    updateProveedorCorreo: (proveedor, value) => {
      const newProveedorState = { ...proveedor };
      newProveedorState.correo = value;
      dispatch(updateProveedor(newProveedorState));
    },
    /*  updateProveedorUsuario: (proveedor, value) => {
      const newProveedorState = { ...proveedor };
      newProveedorState.usuario = value;
      dispatch(updateProveedor(newProveedorState));
    }, */
    updateProveedor: () => {
      dispatch(
        updateProveedor({
          proveedor_id: "",
          nit: "",
          nombre: "",
          direccion: "",
          telefono: "",
          //usuario: "",
          correo: "",
        })
      );
    },
  };
};

export default connect(null, mapToDispatchToProps)(ProveedoresTabComponent);
/* import { doGetProveedoresRequest } from "../../api/request";
export const ProveedoresTabComponent = () => {
  doGetProveedoresRequest().then((data) => console.log(data));

  return (
    <div>
      <h1>PROVEEDOR SECTION</h1>
    </div>
  );
}; */
