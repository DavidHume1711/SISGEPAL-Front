
import './principalComponent.css'

export const PrincipalComponent = () => {
    return <>
        <div className="container">
            <div className="text-center mt-5 blue_cl">
                <h1>PAPELERÍA SAS</h1>
            </div>

            <div className="container-sections mt-4">
                <div className="d-flex gap-3 container-tabs">
                    <button>Empresa</button>
                    <button>Clientes</button>
                    <button>Proveedores</button>
                    <button>Productos</button>
                    <button>Empleados</button>
                </div>

            </div>
        </div>
    </>
}