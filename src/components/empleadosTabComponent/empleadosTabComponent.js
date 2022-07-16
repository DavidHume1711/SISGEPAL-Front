import './empleadosTabComponent.css'
import { FormControl,InputLabel, Input  } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { doGetEmpleadosRequest } from '../../api/request';
import EmpleadosTableComponent from '../empleadosTableComponent/empleadosTableComponent';
import {useSelector} from 'react-redux'
export const EmpleadosTabComponent = () => {

    const empleado = useSelector(state => state.empleado)
    const [empleados, setEmpleados] = useState(null);

    useEffect(()=>{
        doGetEmpleadosRequest().then(({empleados,error})  => {
            if(!error) {
                if(empleados) {
                    setEmpleados(empleados);
                }
            }else {
                alert(error);
            }
            
        })
    },[])

    return (
        <div className='row'>
            <div className='col-3 d-flex gap-3 flex-column form-container'>
                <FormControl>
                    <InputLabel htmlFor='cedula' >Cédula</InputLabel>
                    <Input name='cedula' value={empleado.cedula}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='nombre' >Nombre</InputLabel>
                    <Input name='nombre' value={empleado.nombre}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='correo1' >Correo</InputLabel>
                    <Input name='correo1' value={empleado.correo}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='direccion' >Direccion</InputLabel>
                    <Input name='direccion'  value={empleado.direccion}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='telefono' >Teléfono</InputLabel>
                    <Input name='telefono' value={empleado.telefono}></Input>
                </FormControl>
            </div>

            <div className="col-9">
                {empleados ? 
                <EmpleadosTableComponent empleados={empleados}></EmpleadosTableComponent>
                :
                <></>}
            </div>
        </div>
    )
}