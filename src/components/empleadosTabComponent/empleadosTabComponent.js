import "./empleadosTabComponent.css";
import { useEffect } from "react";
import { useState } from "react";
import {
  doGetEmpleadosRequest,
  doPutEmpleadosRequest,
  doPostEmpleadosRequest,
} from "../../api/request";
import EmpleadosTableComponent from "../empleadosTableComponent/empleadosTableComponent";
import { useSelector } from "react-redux";
import { connect } from "react-redux/es/exports";
import { updateEmpleado } from "../../react_redux/slices/empleadoSlice";
import { removeSession } from "../../react_redux/slices/sessionSlide";
import { removeToken } from "../../utils";

const doUpdateEmpleado = async (
  ev,
  setEmpleados,
  updateEmpleado,
  empleado,
  removeSession
) => {
  const { empleado_id, cedula, nombre, correo, direccion, telefono } = empleado;
  if (empleado_id && cedula && nombre && correo && direccion && telefono) {
    ev.preventDefault();

    const empleado_dto = { cedula, nombre, correo, direccion, telefono };
    doPutEmpleadosRequest(empleado_id, empleado_dto).then(
      ({ status, data }) => {
        const { error } = data;
        if (!error) {
          getEmpleados(setEmpleados);
          alert(`SE ACTUALIZÓ EL EMPLEADO CON ID ${empleado_id}`);
          updateEmpleado();
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

const doCreateEmpleado = async (
  ev,
  setEmpleados,
  updateEmpleado,
  empleado,
  removeSession
) => {
  const { cedula, nombre, correo, direccion, telefono, usuario } = empleado;

  if (cedula && nombre && correo && direccion && telefono && usuario) {
    ev.preventDefault();

    const empleado_dto = {
      cedula,
      nombre,
      correo,
      direccion,
      telefono,
      username: usuario,
    };
    doPostEmpleadosRequest(empleado_dto).then(({ status, data }) => {
      const { empleado_id, error } = data;
      if (!error) {
        getEmpleados(setEmpleados);
        alert(`SE CRÉO EL EMPLEADO Y LE FUE ASIGNADO EL ID ${empleado_id}`);
        updateEmpleado();
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

const getEmpleados = async (setEmpleados, removeSession) => {
  doGetEmpleadosRequest()
    .then(({ status, data }) => {
      const { empleados, error } = data;
      if (!error) {
        if (empleados) {
          setEmpleados(empleados);
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

const EmpleadosTabComponent = ({
  removeSession,
  updateEmpleadoCedula,
  updateEmpleadoNombre,
  updateEmpleadoDireccion,
  updateEmpleadoTelefono,
  updateEmpleadoCorreo,
  updateEmpleadoUsuario,
  updateEmpleado,
}) => {
  const empleado = useSelector((state) => state.empleado);
  const [empleados, setEmpleados] = useState(null);
  const [newEmpleado, setNewEmpleado] = useState(false);

  useEffect(() => {
    getEmpleados(setEmpleados, removeSession);
  }, []);

  return (
    <>
      {empleados ? (
        <EmpleadosTableComponent
          empleados={empleados}
          enable={!newEmpleado}
          updateRows={() => {
            getEmpleados(setEmpleados, removeSession);
          }}
        ></EmpleadosTableComponent>
      ) : (
        <></>
      )}

      <div className="row mt-5 mx-0">
        <div className="col-6 p-0">
          <form
            onSubmit={(ev) => {
              newEmpleado
                ? doCreateEmpleado(
                    ev,
                    setEmpleados,
                    updateEmpleado,
                    empleado,
                    removeSession
                  )
                : doUpdateEmpleado(
                    ev,
                    setEmpleados,
                    updateEmpleado,
                    empleado,
                    removeSession
                  );
            }}
          >
            <div className="row form-empleados mx-0">
              {newEmpleado ? (
                <></>
              ) : (
                <>
                  <div className="col-3 p-0">
                    <label htmlFor="id">ID</label>
                  </div>
                  <div className="col-9 p-0">
                    <input
                      id="empleado_id"
                      type="text"
                      name="id"
                      value={empleado.empleado_id}
                      readOnly
                    />
                  </div>
                </>
              )}
              <div className="col-3 p-0">
                <label htmlFor="cedula">Cédula</label>
              </div>
              <div className="col-9 p-0">
                <input
                  id="empleado_cedula"
                  type="text"
                  name="cedula"
                  value={empleado.cedula}
                  onChange={(ev) =>
                    updateEmpleadoCedula(empleado, ev.currentTarget.value)
                  }
                  required
                />
              </div>
              <div className="col-3 p-0">
                <label htmlFor="nombre">Nombre</label>
              </div>
              <div className="col-9 p-0">
                <input
                  id="empleado_nombre"
                  type="text"
                  name="nombre"
                  value={empleado.nombre}
                  onChange={(ev) =>
                    updateEmpleadoNombre(empleado, ev.currentTarget.value)
                  }
                  required
                />
              </div>
              <div className="col-3 p-0">
                <label htmlFor="correo">Correo</label>
              </div>
              <div className="col-9 p-0">
                <input
                  id="empleado_correo"
                  type="text"
                  name="correo"
                  value={empleado.correo}
                  onChange={(ev) =>
                    updateEmpleadoCorreo(empleado, ev.currentTarget.value)
                  }
                  required
                />
              </div>
              <div className="col-3 p-0">
                <label htmlFor="direccion">Direccion</label>
              </div>
              <div className="col-9 p-0">
                <input
                  id="empleado_direccion"
                  type="text"
                  name="direccion"
                  value={empleado.direccion}
                  onChange={(ev) =>
                    updateEmpleadoDireccion(empleado, ev.currentTarget.value)
                  }
                  required
                />
              </div>
              <div className="col-3 p-0">
                <label htmlFor="telefono">Teléfono</label>
              </div>
              <div className="col-9 p-0">
                <input
                  id="empleado_telefono"
                  type="text"
                  name="telefono"
                  value={empleado.telefono}
                  onChange={(ev) =>
                    updateEmpleadoTelefono(empleado, ev.currentTarget.value)
                  }
                  required
                />
              </div>
              {newEmpleado ? (
                <>
                  <div className="col-3 p-0">
                    <label htmlFor="usuario">Usuario</label>
                  </div>
                  <div className="col-9 p-0">
                    <input
                      id="empleado_usuario"
                      type="text"
                      name="usuario"
                      value={empleado.usuario}
                      onChange={(ev) =>
                        updateEmpleadoUsuario(empleado, ev.currentTarget.value)
                      }
                      required
                    />
                  </div>
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
                  newEmpleado
                    ? doCreateEmpleado(
                        ev,
                        setEmpleados,
                        updateEmpleado,
                        empleado,
                        removeSession
                      )
                    : doUpdateEmpleado(
                        ev,
                        setEmpleados,
                        updateEmpleado,
                        empleado,
                        removeSession
                      );
                }}
              >
                {newEmpleado ? "Crear" : "Guardar cambios"}
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
                  updateEmpleado();
                  setNewEmpleado(!newEmpleado);
                }}
              >
                {newEmpleado ? "Editar empleado" : "Nuevo empleado"}
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
    updateEmpleadoId: (empleado, value) => {
      const newEmpleadoState = { ...empleado };
      newEmpleadoState.empleado_id = value;
      dispatch(updateEmpleado(newEmpleadoState));
    },
    updateEmpleadoCedula: (empleado, value) => {
      const newEmpleadoState = { ...empleado };
      newEmpleadoState.cedula = value;
      dispatch(updateEmpleado(newEmpleadoState));
    },
    updateEmpleadoNombre: (empleado, value) => {
      const newEmpleadoState = { ...empleado };
      newEmpleadoState.nombre = value;
      dispatch(updateEmpleado(newEmpleadoState));
    },
    updateEmpleadoDireccion: (empleado, value) => {
      const newEmpleadoState = { ...empleado };
      newEmpleadoState.direccion = value;
      dispatch(updateEmpleado(newEmpleadoState));
    },
    updateEmpleadoTelefono: (empleado, value) => {
      const newEmpleadoState = { ...empleado };
      newEmpleadoState.telefono = value;
      dispatch(updateEmpleado(newEmpleadoState));
    },
    updateEmpleadoCorreo: (empleado, value) => {
      const newEmpleadoState = { ...empleado };
      newEmpleadoState.correo = value;
      dispatch(updateEmpleado(newEmpleadoState));
    },
    updateEmpleadoUsuario: (empleado, value) => {
      const newEmpleadoState = { ...empleado };
      newEmpleadoState.usuario = value;
      dispatch(updateEmpleado(newEmpleadoState));
    },
    updateEmpleado: () => {
      dispatch(
        updateEmpleado({
          empleado_id: "",
          cedula: "",
          nombre: "",
          direccion: "",
          telefono: "",
          usuario: "",
          correo: "",
        })
      );
    },
  };
};

export default connect(null, mapToDispatchToProps)(EmpleadosTabComponent);
