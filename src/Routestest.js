import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./asset/pages/home";
import { AuthProvider } from './context/AuthContext';
import Empleado from "./asset/pages/empleado";
import Usuario from "./asset/pages/usuario";
import PrivateRoute from './components/PrivateRoute';
import Login from "./Login";


const AppRoutes = () => {
  return (
    <React.Fragment>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/home" 
          element={<PrivateRoute element={<Home />} />}
        />
        <Route 
          path="/home/empleado" 
          element={<PrivateRoute element={<Empleado />} />} 
        />
        <Route 
          path="/home/usuario" 
          element={<PrivateRoute element={<Usuario />} />} 
          />
        
        {/* Ruta catch-all */}
       {/**<Route path="*" element={<Navigate to="/" />} /> */} 
      </Routes>
      </AuthProvider>
    </React.Fragment>
  );
};

export default AppRoutes;
