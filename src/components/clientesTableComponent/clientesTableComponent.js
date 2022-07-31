import * as React from 'react';
import deleteIcon from './images/delete.png'
import editIcon from './images/edit.png'
import { connect } from 'react-redux';
import { updateCliente } from '../../react_redux/slices/clienteSlice';
import { doDeleteClientesRequest } from '../../api/request';
import { removeToken } from '../../utils';
import { removeSession } from '../../react_redux/slices/sessionSlide';
const onSelectCliente = (cliente_id,cedula, dispatch) => {

  const dataEmp = [];
  const row = document.getElementById(`${cliente_id}-${cedula}`);
  row.querySelectorAll("td").forEach((tdCliente,index) => {
    dataEmp[index] = tdCliente.innerText ;
  });
  const newClienteState = {
    cliente_id: dataEmp[0],
    cedula: dataEmp[1],
    nombre: dataEmp[2],
    correo: dataEmp[3],
    direccion: dataEmp[4],
    telefono: dataEmp[5]
  }
  console.log(newClienteState)
  dispatch(newClienteState);
}

const onRemoveCliente = (cliente_id, removeSession,updateRows) => {

  const confirmAction = window.confirm(`¿Está seguro de elminar el cliente con id ${cliente_id}?`);
  if (confirmAction) {
    doDeleteClientesRequest(cliente_id)
    .then(({status,data}) => {
      const {error,cliente_id} = data;
      if(!error) {
        updateRows();
        alert(`Se eliminó satisfactoriamente el cliente con id ${cliente_id}`);
      }else {
        if(status === 403){
          removeToken(removeSession)
          return;
      }
      
      alert(`OCURRIÓ EL SIGUIENTE ERROR. Código: ${status}. Error: ${error}`)
      }
    })
  }
}

 function ClientesTableComponent({clientes,enable,updateCliente,removeSession,updateRows}) {
  return (

  <div className='container-table'>
      <table className='text-center w-100'>
        <thead>
          <tr>
            <th>ID</th>
            <th>CÉDULA</th>
            <th>NOMBRE</th>
            <th>CORREO</th>
            <th>DIRECCIÓN</th>
            <th>TELÉFONO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
            {clientes.map((row) => (
              <tr
                key={row.cliente_id}
                id= {`${row.cliente_id}-${row.cedula}`}
                className='text-start'
              >
                <td>{row.cliente_id}</td>
                <td>{row.cedula}</td>
                <td>{row.nombre}</td>
                <td>{row.correo}</td>
                <td>{row.direccion}</td>
                <td>{row.telefono}</td>
                <td>
                  <div className={`d-flex gap-2 justify-content-center align-items-center ${enable? '':'disable-actions'}`}>
                    <div>
                      <img src={editIcon} alt="" 
                      onClick={ev => onSelectCliente(row.cliente_id,row.cedula, updateCliente)}
                      className='action-icon'/>
                    </div>
                    <div>
                      <img src={deleteIcon} alt="" 
                      onClick={ev => onRemoveCliente(row.cliente_id,removeSession,updateRows)}
                      className='action-icon'/>
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
      dispatcher(removeSession())
    },
    updateCliente : (payload) => dispatcher(updateCliente(payload))
  }
}
export default connect(null,mapToDispathToProps)(ClientesTableComponent)