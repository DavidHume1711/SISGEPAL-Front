import * as React from 'react';
import deleteIcon from './images/delete.png'
import editIcon from './images/edit.png'
import { connect } from 'react-redux';
import { updateEmpleado } from '../../react_redux/slices/empleadoSlice';

const onSelectEmpleado = (empleado_id,cedula, dispatch) => {

  const dataEmp = [];
  const row = document.getElementById(`${empleado_id}-${cedula}`);
  row.querySelectorAll("td").forEach((tdEmpleado,index) => {
    dataEmp[index] = tdEmpleado.innerText ;
  });
  const newEmpleadoState = {
    empleado_id: dataEmp[0],
    cedula: dataEmp[1],
    nombre: dataEmp[2],
    correo: dataEmp[3],
    direccion: dataEmp[4],
    telefono: dataEmp[5]
  }
  console.log(newEmpleadoState)
  dispatch(newEmpleadoState);
}

 function EmpleadosTableComponent({empleados,enable,updateEmpleado}) {
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
            {empleados.map((row) => (
              <tr
                key={row.empleado_id}
                id= {`${row.empleado_id}-${row.cedula}`}
                className='text-start'
              >
                <td>{row.empleado_id}</td>
                <td>{row.cedula}</td>
                <td>{row.nombre}</td>
                <td>{row.correo}</td>
                <td>{row.direccion}</td>
                <td>{row.telefono}</td>
                <td>
                  <div className={`d-flex gap-2 justify-content-center align-items-center ${enable? '':'disable-actions'}`}>
                    <div>
                      <img src={editIcon} alt="" 
                      onClick={ev => onSelectEmpleado(row.empleado_id,row.cedula, updateEmpleado)}
                      className='action-icon'/>
                    </div>
                    <div>
                      <img src={deleteIcon} alt="" 
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
    updateEmpleado : (payload) => dispatcher(updateEmpleado(payload))
  }
}
export default connect(null,mapToDispathToProps)(EmpleadosTableComponent)