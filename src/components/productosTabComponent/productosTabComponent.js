import "./productosTabComponent.css";
import { useEffect } from "react";
import { useState } from "react";
import {
  doGetProductosRequest,
  doPutProductosRequest,
  doPostProductosRequest,
} from "../../api/request";
import ProductosTableComponent from "../productosTableComponent/productosTableComponent";
import { useSelector } from "react-redux";
import { connect } from "react-redux/es/exports";
import { updateProducto } from "../../react_redux/slices/productoSlice";
import { removeSession } from "../../react_redux/slices/sessionSlide";
import { removeToken } from "../../utils";


const doUpdateProducto = async(ev,setProductos, updateProducto,producto,removeSession) => {
  const {producto_id,codigo_producto,poveedor_id,nombre,stock,precio} = producto;
  if(producto_id && codigo_producto && poveedor_id && nombre && stock && precio){  
      ev.preventDefault();
      
      const producto_dto  = {codigo_producto,poveedor_id,nombre,stock,precio}
      doPutProductosRequest(producto_id,producto_dto)
      .then(({status,data}) => {
          const {error} = data;
          if(!error) {
            getProductos(setProductos);
              alert(`SE ACTUALIZÓ EL PRODUCTO CON ID ${producto_id}`);
              updateProducto();
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

const doCreateProducto = async(ev,setProductos,updateProducto, producto,removeSession) => {
  const {codigo_producto,poveedor_id,nombre,stock,precio} = producto;
  
  if(codigo_producto && poveedor_id && nombre && stock && precio){  
      ev.preventDefault();
      
      const producto_dto  = {codigo_producto,poveedor_id,nombre,stock,precio}
      doPostProductosRequest(producto_dto)
      .then(({status,data}) => {
          const {producto_id,error} = data;
          if(!error) {
            getProductos(setProductos);
              alert(`SE CRÉO EL PRODUCTO Y LE FUE ASIGNADO EL ID ${producto_id}`);
              updateProducto();
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

const getProductos = async (setProductos, removeSession) => {
  doGetProductosRequest().then(({status,data})  => {
      const {productos,error} = data;
      if(!error) {
          if(productos) {
            setProductos(productos);
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

const ProductosTabComponent = ({removeSession,updateProductoCodigo,updateProductoIdProveedor,updateProductoNombre,
  updateProductoStock,updateProductoPrecio,updateProducto}) => {


  const producto = useSelector(state => state.producto)
  const [productos, setProdutos] = useState(null);
  const [newProducto, setNewProducto] = useState(false);


  useEffect(()=>{
      getProductos(setProdutos, removeSession);
  },[])

  return (
      <>
      {productos ? 
          <ProductosTableComponent productos={productos} enable={!newProducto} 
          updateRows={()=>{getProductos(setProdutos,removeSession)}}>

          </ProductosTableComponent>
          :
      <></>}

      <div className='row mt-5 mx-0'>
          <div className="col-6 p-0">
              <form onSubmit={ev => {
                          newProducto ?
                          doCreateProducto(ev,setProdutos,updateProducto,producto,removeSession)
                          :
                          doUpdateProducto(ev,setProdutos,updateProducto,producto,removeSession)
                      }}>
                  <div className="row form-productos mx-0">
                      {
                          newProducto ? 
                          <>
                          </>
                          :
                          <>
                          <div className="col-3 p-0">
                              <label htmlFor="id">ID</label>
                          </div>
                          <div className="col-9 p-0">
                              <input id='producto_id' type="text" name='id' 
                              value={producto.producto_id} readOnly/>
                          </div>
                          </>
                      }
                      <div className="col-3 p-0">
                          <label htmlFor="codigo">Codigo</label>
                      </div>
                      <div className="col-9 p-0">
                          <input id='codigo_producto' type="text" name='codigo' 
                          value={producto.codigo_producto} 
                          onChange={ev => updateProductoCodigo(producto,ev.currentTarget.value)}
                          required/>
                      </div>
                      <div className="col-3 p-0">
                          <label htmlFor="proveedor">ID Proveedor</label>
                      </div>
                      <div className="col-9 p-0">
                          <input  id='proveedor_id' type="text" name='proveedor_id' 
                          value={producto.proveedor_id} 
                          onChange={ev => updateProductoIdProveedor(producto,ev.currentTarget.value)}
                          required/>
                      </div>
                      <div className="col-3 p-0">
                          <label htmlFor="nombre">Nombre</label>
                      </div>
                      <div className="col-9 p-0">
                          <input  id='producto_nombre' type="text" name='nombre' 
                          value={producto.nombre} 
                          onChange={ev => updateProductoNombre(producto,ev.currentTarget.value)}
                          required/>
                      </div>
                      <div className="col-3 p-0">
                          <label htmlFor="stock">Stock</label>
                      </div>
                      <div className="col-9 p-0">
                          <input  id='producto_stock' type="text" name='stock' 
                          value={producto.stock} 
                          onChange={ev => updateProductoStock(producto,ev.currentTarget.value)}
                          required/>
                      </div>
                      <div className="col-3 p-0">
                          <label htmlFor="precio">Precio</label>
                      </div>
                      <div className="col-9 p-0">
                          <input  id='producto_precio' type="text" name='precio' 
                          value={producto.precio} 
                          onChange={ev => updateProductoPrecio(producto,ev.currentTarget.value)}
                          required/>
                      </div>
                      {
                          newProducto ?
                        <>
                        {/*}
                          <div className="col-3 p-0">
                              <label htmlFor="usuario">Usuario</label>
                          </div>
                          <div className="col-9 p-0">
                              <input  id='empleado_usuario' type="text" name='usuario' 
                              value={empleado.usuario} 
                              onChange={ev => updateEmpleadoUsuario(empleado,ev.currentTarget.value)}
                              required/>
                      </div>*/}
                          </>
                          :  
                          <></>                          
                      }
                  </div>
                  <div className='mt-3'>
                      <button className='btn-action' 
                      onClick={ev => {
                          console.log("EV")
                          newProducto ?
                          doCreateProducto(ev,setProdutos,updateProducto,producto,removeSession)
                          :
                          doUpdateProducto(ev,setProdutos,updateProducto,setProdutos,removeSession)
                      }}

                      >
                          {newProducto ? 'Crear' : 'Guardar cambios'}
                      </button>
                  </div>
              </form>
          </div>
          <div className="col-6 d-flex align-items-center">
              <div className='d-flex flex-column gap-3'>
                  <div>
                      <button className='btn-action'
                          onClick={ev => {updateProducto();setNewProducto(!newProducto)}}
                          
                          >
                          {newProducto ? 'Editar producto' : 'Nuevo producto'}
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
      updateProductoId : (producto,value) => {
          const newProductoState = {...producto};
          newProductoState.producto_id = value;
          dispatch(updateProducto(newProductoState));
      },
      updateProductoCodigo: (producto,value) => {
          const newProductoState = {...producto};
          newProductoState.codigo_producto = value;
          dispatch(updateProducto(newProductoState));
      },
      updateProductoIdProveedorId : (producto,value) => {
          const newProductoState = {...producto};
          newProductoState.proveedor_id = value;
          dispatch(updateProducto(newProductoState));
      },
      updateProductoNombre : (producto,value) => {
          const newProductoState = {...producto};
          newProductoState.nombre = value;
          dispatch(updateProducto(newProductoState));
      },
      updateProductoStock : (producto,value) => {
          const newProductoState = {...producto};
          newProductoState.stock = value;
          dispatch(updateProducto(newProductoState));
      },
      updateProductoPrecio : (producto,value) => {
          const newProductoState = {...producto};
          newProductoState.precio = value;
          dispatch(updateProducto(newProductoState));
      },
      
      updateProducto : () => {
          dispatch(updateProducto({
              producto_id: '',
              codigo_producto: '',
              proveedor_id: '',
              nombre: '',
              stock: '',
              precio: ''
          }))
      }
  }
}

export default connect(null, mapToDispatchToProps)(ProductosTabComponent);
