import React from "react";
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from "./asset/pages/home";
import Empleado from "./asset/pages/empleado";
import Usuario from "./asset/pages/usuario";
import Login from "./Login";
import Sidebar from './Sidebar';
import Reporteuser from './asset/pages/reporteuser';
import Ajustes from './asset/pages/ajustes';
import Logout from './Logout';
import Categoriaplato from "./asset/pages/categoriaplato";
import Plato from "./asset/pages/plato";
import Mesa from "./asset/pages/mesa";
import Orden from "./asset/pages/orden";
import Detalleorden from "./asset/pages/detalleorden";
import AdminPanel from './asset/pages/AdminPanel'; // Importa el AdminPanel
import Reporteempleado from  "./asset/pages/reporteempleado";
import ReportePlato from  "./asset/pages/reporteplato";
import Frontmesero from "./asset/pages/frontmesero"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const PrivateLayout = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="flex-grow-1 p-3 bg-light overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/home" replace /> : <Login />} />
      
      <Route element={<PrivateLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="usuario" element={<Usuario />} />
        <Route path="empleado" element={<Empleado />} />
        <Route path="reporteuser" element={<Reporteuser />} />
        <Route path="reporteempleado" element={<Reporteempleado />} />
        <Route path="categoriaplato" element={<Categoriaplato />} />
        <Route path="plato" element={<Plato />} />
        <Route path="mesa" element={<Mesa />} />
        <Route path="orden" element={<Orden />} />
        <Route path="detalleorden" element={<Detalleorden />} />
        <Route path="detalleorden" element={<Detalleorden />} />
        <Route path="reporteplato" element={<ReportePlato />} />
        <Route path="frontmesero" element={<Frontmesero />} />
        <Route path="ajustes" element={<Ajustes />} />
        <Route path="Logout" element={<Logout />} />
      </Route>

      <Route path="*" element={<Navigate to={user ? "/home" : "/"} replace />} />
    </Routes>
  );
};

export default AppRoutes;