import './empleadosTabComponent.css'
import { FormControl,InputLabel, Input  } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { doGetEmpleadosRequest } from '../../api/request';
import { EmpleadosTableComponent } from '../empleadosTableComponent/empleadosTableComponent';

export const EmpleadosTabComponent = () => {

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
                    <Input name='cedula'></Input>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='nombre' >Nombre</InputLabel>
                    <Input name='nombre'></Input>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='correo' >Correo</InputLabel>
                    <Input name='correo'></Input>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='direccion' >Direccion</InputLabel>
                    <Input name='direccion'></Input>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='telefono' >Teléfono</InputLabel>
                    <Input name='telefono'></Input>
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