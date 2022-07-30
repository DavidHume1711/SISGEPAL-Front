import './clientesTabComponent.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { doGetClientesRequest, doPutClientesRequest, doPostClientesRequest } from '../../api/request';
import ClientesTableComponent from '../clientesTableComponent/clientesTableComponent';
import {useSelector} from 'react-redux'
import { connect } from 'react-redux/es/exports';
import { updateCliente } from '../../react_redux/slices/clienteSlice';
import { removeSession } from '../../react_redux/slices/sessionSlide';
import { removeToken } from '../../utils';

const doUpdateCliente = async(ev,setClientes, updateCliente,cliente,removeSession) => {
    const {cliente_id,cedula,nombre,correo,direccion,telefono} = cliente;
    if(cliente_id && cedula && nombre && correo && direccion && telefono){  
        ev.preventDefault();
        
        const cliente_dto  = {cedula,nombre,correo,direccion,telefono}
        doPutClientesRequest(cliente_id,cliente_dto)
        .then(({status,data}) => {
            const {error} = data;
            if(!error) {
                getClientes(setClientes);
                alert(`SE ACTUALIZÓ EL EMPLEADO CON ID ${cliente_id}`);
                updateCliente();
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

const doCreateCliente = async(ev,setClientes,updateCliente, cliente,removeSession) => {
    const {cedula,nombre,correo,direccion,telefono,usuario} = cliente;
    
    if(cedula && nombre && correo && direccion && telefono && usuario){  
        ev.preventDefault();
        
        const cliente_dto  = {cedula,nombre,correo,direccion,telefono,username: usuario}
        doPostClientesRequest(cliente_dto)
        .then(({status,data}) => {
            const {cliente_id,error} = data;
            if(!error) {
                getClientes(setClientes);
                alert(`SE CRÉO EL EMPLEADO Y LE FUE ASIGNADO EL ID ${cliente_id}`);
                updateCliente();
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

const getClientes = async (setClientes, removeSession) => {
    doGetClientesRequest().then(({status,data})  => {
        const {clientes,error} = data;
        if(!error) {
            if(clientes) {
                setClientes(clientes);
            }
        }else {
            if(status === 403){
                removeToken(removeSession)
                return;
            }
            
            alert(`OCURRIÓ UN ERROR INESPERADO. Código: ${status}. Error: ${error}`)

        }
        
    }).catch(e=>console.log(e))
}

const ClientesTabComponent = ({removeSession,updateClienteCedula,updateClienteNombre,updateClienteDireccion,
    updateClienteTelefono,updateClienteCorreo,updateClienteUsuario, updateCliente}) => {


    const cliente = useSelector(state => state.cliente)
    const [clientes, setClientes] = useState(null);
    const [newCliente, setNewCliente] = useState(false);


    useEffect(()=>{
        getClientes(setClientes, removeSession);
    },[])

    return (
        <>
        {clientes ? 
            <ClientesTableComponent clientes={clientes} enable={!newCliente} 
            updateRows={()=>{getClientes(setClientes,removeSession)}}>

            </ClientesTableComponent>
            :
        <></>}

        <div className='row mt-5 mx-0'>
            <div className="col-6 p-0">
                <form onSubmit={ev => {
                            newCliente ?
                            doCreateCliente(ev,setClientes,updateCliente,cliente,removeSession)
                            :
                            doUpdateCliente(ev,setClientes,updateCliente,cliente,removeSession)
                        }}>
                    <div className="row form-clientes mx-0">
                        {
                            newCliente ? 
                            <>
                            </>
                            :
                            <>
                            <div className="col-3 p-0">
                                <label htmlFor="id">ID</label>
                            </div>
                            <div className="col-9 p-0">
                                <input id='cliente_id' type="text" name='id' 
                                value={cliente.cliente_id} readOnly/>
                            </div>
                            </>
                        }
                        <div className="col-3 p-0">
                            <label htmlFor="cedula">Cédula</label>
                        </div>
                        <div className="col-9 p-0">
                            <input id='cliente_cedula' type="text" name='cedula' 
                            value={cliente.cedula} 
                            onChange={ev => updateClienteCedula(cliente,ev.currentTarget.value)}
                            required/>
                        </div>
                        <div className="col-3 p-0">
                            <label htmlFor="nombre">Nombre</label>
                        </div>
                        <div className="col-9 p-0">
                            <input  id='cliente_nombre' type="text" name='nombre' 
                            value={cliente.nombre} 
                            onChange={ev => updateClienteNombre(cliente,ev.currentTarget.value)}
                            required/>
                        </div>
                        <div className="col-3 p-0">
                            <label htmlFor="correo">Correo</label>
                        </div>
                        <div className="col-9 p-0">
                            <input  id='cliente_correo' type="text" name='correo' 
                            value={cliente.correo} 
                            onChange={ev => updateClienteCorreo(cliente,ev.currentTarget.value)}
                            required/>
                        </div>
                        <div className="col-3 p-0">
                            <label htmlFor="direccion">Direccion</label>
                        </div>
                        <div className="col-9 p-0">
                            <input  id='cliente_direccion' type="text" name='direccion' 
                            value={cliente.direccion} 
                            onChange={ev => updateClienteDireccion(cliente,ev.currentTarget.value)}
                            required/>
                        </div>
                        <div className="col-3 p-0">
                            <label htmlFor="telefono">Teléfono</label>
                        </div>
                        <div className="col-9 p-0">
                            <input  id='cliente_telefono' type="text" name='telefono' 
                            value={cliente.telefono} 
                            onChange={ev => updateClienteTelefono(cliente,ev.currentTarget.value)}
                            required/>
                        </div>
                        {
                            newCliente ? 
                            <>
                            <div className="col-3 p-0">
                                <label htmlFor="usuario">Usuario</label>
                            </div>
                            <div className="col-9 p-0">
                                <input  id='cliente_usuario' type="text" name='usuario' 
                                value={cliente.usuario} 
                                onChange={ev => updateClienteUsuario(cliente,ev.currentTarget.value)}
                                required/>
                            </div>
                            </>
                            :  
                            <></>                          
                        }
                    </div>
                    <div className='mt-3'>
                        <button className='btn-action' 
                        onClick={ev => {
                            console.log("EV")
                            newCliente ?
                            doCreateCliente(ev,setClientes,updateCliente,cliente,removeSession)
                            :
                            doUpdateCliente(ev,setClientes,updateCliente,cliente,removeSession)
                        }}

                        >
                            {newCliente ? 'Crear' : 'Guardar cambios'}
                        </button>
                    </div>
                </form>
            </div>
            <div className="col-6 d-flex align-items-center">
                <div className='d-flex flex-column gap-3'>
                    <div>
                        <button className='btn-action'
                            onClick={ev => {updateCliente();setNewCliente(!newCliente)}}
                            
                            >
                            {newCliente ? 'Editar cliente' : 'Nuevo cliente'}
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
        </>

    )
    
}

const mapToDispatchToProps = (dispatch) => {
    return {
        removeSession: () => {
            dispatch(removeSession())
        },
        updateClienteId : (cliente,value) => {
            const newClienteState = {...cliente};
            newClienteState.cliente_id = value;
            dispatch(updateCliente(newClienteState));
        },
        updateClienteCedula: (cliente,value) => {
            const newClienteState = {...cliente};
            newClienteState.cedula = value;
            dispatch(updateCliente(newClienteState));
        },
        updateClienteNombre : (cliente,value) => {
            const newClienteState = {...cliente};
            newClienteState.nombre = value;
            dispatch(updateCliente(newClienteState));
        },
        updateClienteDireccion : (cliente,value) => {
            const newClienteState = {...cliente};
            newClienteState.direccion = value;
            dispatch(updateCliente(newClienteState));
        },
        updateClienteTelefono : (cliente,value) => {
            const newClienteState = {...cliente};
            newClienteState.telefono = value;
            dispatch(updateCliente(newClienteState));
        },
        updateClienteCorreo : (cliente,value) => {
            const newClienteState = {...cliente};
            newClienteState.correo = value;
            dispatch(updateCliente(newClienteState));
        },
        updateClienteUsuario : (cliente,value) => {
            const newClienteState = {...cliente};
            newClienteState.usuario = value;
            dispatch(updateCliente(newClienteState));
        },
        updateCliente : () => {
            dispatch(updateCliente({
                cliente_id: '',
                cedula: '',
                nombre: '',
                direccion: '',
                telefono: '',
                usuario: '',
                correo: ''
            }))
        }
    }
}

export default connect(null,mapToDispatchToProps)(ClientesTabComponent);