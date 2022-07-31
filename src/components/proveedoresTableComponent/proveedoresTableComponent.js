import * as React from "react";
import deleteIcon from "./images/delete.png";
import editIcon from "./images/edit.png";
import { connect } from "react-redux";
import { updateProveedor } from "../../react_redux/slices/proveedorSlice";
import { doDeleteProveedoresRequest } from "../../api/request";
import { removeToken } from "../../utils";
import { removeSession } from "../../react_redux/slices/sessionSlide";
const onSelectProveedor = (proveedor_id, nit, dispatch) => {
  const dataProv = [];
  const row = document.getElementById(`${proveedor_id}-${nit}`);
  row.querySelectorAll("td").forEach((tdProveedor, index) => {
    dataProv[index] = tdProveedor.innerText;
  });
  const newProveedorState = {
    proveedor_id: dataProv[0],
    nit: dataProv[1],
    nombre: dataProv[2],
    correo: dataProv[3],
    direccion: dataProv[4],
    telefono: dataProv[5],
  };
  console.log(newProveedorState);
  dispatch(newProveedorState);
};

const onRemoveProveedor = (proveedor_id, removeSession, updateRows) => {
  const confirmAction = window.confirm(
    `¿Está seguro de elminar el proveedor con id ${proveedor_id}?`
  );
  if (confirmAction) {
    doDeleteProveedoresRequest(proveedor_id).then(({ status, data }) => {
      const { error, proveedor_id } = data;
      if (!error) {
        updateRows();
        alert(
          `Se eliminó satisfactoriamente el proveedor con id ${proveedor_id}`
        );
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

function ProveedoresTableComponent({
  proveedores,
  enable,
  updateProveedor,
  removeSession,
  updateRows,
}) {
  return (
    <div className="container-table">
      <table className="text-center w-100">
        <thead>
          <tr>
            <th>ID</th>
            <th>NIT</th>
            <th>NOMBRE</th>
            <th>CORREO</th>
            <th>DIRECCIÓN</th>
            <th>TELÉFONO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((row) => (
            <tr
              key={row.proveedor_id}
              id={`${row.proveedor_id}-${row.nit}`}
              className="text-start"
            >
              <td>{row.proveedor_id}</td>
              <td>{row.nit}</td>
              <td>{row.nombre}</td>
              <td>{row.correo}</td>
              <td>{row.direccion}</td>
              <td>{row.telefono}</td>
              <td>
                <div
                  className={`d-flex gap-2 justify-content-center align-items-center ${
                    enable ? "" : "disable-actions"
                  }`}
                >
                  <div>
                    <img
                      src={editIcon}
                      alt=""
                      onClick={(ev) =>
                        onSelectProveedor(
                          row.proveedor_id,
                          row.nit,
                          updateProveedor
                        )
                      }
                      className="action-icon"
                    />
                  </div>
                  <div>
                    <img
                      src={deleteIcon}
                      alt=""
                      onClick={(ev) =>
                        onRemoveProveedor(
                          row.proveedor_id,
                          removeSession,
                          updateRows
                        )
                      }
                      className="action-icon"
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const mapToDispathToProps = (dispatcher) => {
  return {
    removeSession: () => {
      dispatcher(removeSession());
    },
    updateProveedor: (payload) => dispatcher(updateProveedor(payload)),
  };
};
export default connect(null, mapToDispathToProps)(ProveedoresTableComponent);
