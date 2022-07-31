import "./principalComponent.css";
import { EmpresaTabComponent } from "../empresaTabComponent/empresaTabComponent";
import { ClientesTabComponent } from "../clientesTabComponent/clientesTabComponent";
import ProveedoresTabComponent from "../proveedoresTabComponent/proveedoresTabComponent";
import ProductosTabComponent from "../productosTabComponent/productosTabComponent";
import EmpleadosTabComponent from "../empleadosTabComponent/empleadosTabComponent";
import { Box } from "@mui/material";  
import { Tab } from "@mui/material";   //
import { Tabs } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { useState } from "react";
import { useSelector } from "react-redux";

export const PrincipalComponent = () => {
  const {
    user: { authorities },
  } = useSelector((state) => state.session);
  const [currentTab, setCurrentTab] = useState("0");
  return (
    <>
      <div className="container">
        <div className="text-center py-4 blue_cl">
          <h1>PAPELERÍA SAS</h1>
        </div>

        <div className="container-sections">
          <TabContext value={currentTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                onChange={(ev) => console.log(ev)}
                aria-label="basic tabs example"
              >
                <Tab label="Empresa" onClick={(ev) => setCurrentTab("0")} />
                <Tab label="Clientes" onClick={(ev) => setCurrentTab("1")} />
                <Tab label="Productos" onClick={(ev) => setCurrentTab("2")} />
                <Tab label="Proveedores" onClick={(ev) => setCurrentTab("3")} />
                {authorities.includes("ROLE_ADMIN") ? (
                  <Tab label="Empleados" onClick={(ev) => setCurrentTab("4")} />
                ) : (
                  <></>
                )}
              </Tabs>
            </Box>
            <TabPanel value={"0"} index={0}>
              <EmpresaTabComponent></EmpresaTabComponent>
            </TabPanel>
            <TabPanel value={"1"} index={1}>
              <ClientesTabComponent></ClientesTabComponent>
            </TabPanel>
            <TabPanel value={"2"} index={2}>
              <ProductosTabComponent></ProductosTabComponent>
            </TabPanel>
            <TabPanel value={"3"} index={3}>
              <ProveedoresTabComponent></ProveedoresTabComponent>
            </TabPanel>
            {authorities.includes("ROLE_ADMIN") ? (
              <TabPanel value={"4"} index={4}>
                <EmpleadosTabComponent></EmpleadosTabComponent>
              </TabPanel>
            ) : (
              <></>
            )}
          </TabContext>

          {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs >
                            <Tab value={false} label="Empresa"  />
                            <Tab value={false} label="Clientes"  />
                            <Tab value={false} label="Productos"  />
                            <Tab value={false} label="Proveedores"  />
                            <Tab value={false} label="Empleados"  />
                        </Tabs>
                    </Box>
 */}
        </div>
      </div>
    </>
  );
};
