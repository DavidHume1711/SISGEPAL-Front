import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export  function EmpleadosTableComponent({empleados}) {
  return (
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: '100%'}} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">CÉDULA</TableCell>
              <TableCell align="center">NOMBRE</TableCell>
              <TableCell align="center">CORREO</TableCell>
              <TableCell align="center">DIRECCIÓN</TableCell>
              <TableCell align="center">TELÉFONO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empleados.map((row) => (
              <TableRow
                key={row.empleado_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.empleado_id}
                </TableCell>
                <TableCell align="center">{row.cedula}</TableCell>
                <TableCell align="center">{row.nombre}</TableCell>
                <TableCell align="center">{row.correo}</TableCell>
                <TableCell align="center">{row.direccion}</TableCell>
                <TableCell align="center">{row.telefono}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
