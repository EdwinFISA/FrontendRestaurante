// AppRoutes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./asset/pages/home";
import { AuthProvider } from './context/AuthContext';
import Empleado from "./asset/pages/empleado";
import Usuario from "./asset/pages/usuario";
import PrivateRoute from './components/PrivateRoute';
import Login from "./Login";
import Sidebar from './Sidebar';
import Reporteuser from './asset/pages/reporteuser';
import Ajustes from './asset/pages/ajustes';
import Logout from './logout';
//import Menu from './asset/pages/menu';
import Categoriaplato from "./asset/pages/categoriaplato";
import Plato from "./asset/pages/plato";
import Mesa from  "./asset/pages/mesa";
import Orden from  "./asset/pages/orden";
import Detalleorden from  "./asset/pages/detalleorden";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AppRoutes = () => {
  return (

      <AuthProvider>
        <Routes>
          {/* Ruta pública para el login */}
          <Route path="/" element={<Login />} />
          {/* Ruta protegida para todas las páginas */}
          <Route
            path="*"
            element={
              <PrivateRoute
                element={
                  <div className="d-flex vh-100">
                    <Sidebar />
                    <div className="flex-grow-1 p-3 bg-light overflow-auto">
                      <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/usuario" element={<Usuario />} />
                        <Route path="/empleado" element={<Empleado />} />
                        <Route path="/reporteuser" element={<Reporteuser />} />
                        <Route path="/categoriaplato" element={<Categoriaplato />} />
                        <Route path="/plato" element={<Plato />} />
                        <Route path="/mesa" element={<Mesa />} />
                        <Route path="/orden" element={<Orden />} />
                        <Route path="/detalleorden" element={<Detalleorden />} />
                        {/*<Route path="/menu" element={<Menu />} />*/}
                        <Route path="/ajustes" element={<Ajustes />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/" element={<Navigate to="/home" />} />
                      </Routes>
                    </div>
                  </div>
                }
              />
            }
          />
        </Routes>
      </AuthProvider>
  );
};


export default AppRoutes;