import "../style/usuarios.css";
import React, { useState, useEffect } from 'react';
// Instalar axios con: npm install axios
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { AllowedAccess } from 'react-permission-role';

function Usuario() {
  // Hooks de Usuario
  const [id, setId] = useState(""); // Este id es id_usuarios
  const [personas, setPersonas] = useState([]);
  const [personasSinUsuario, setPersonasSinUsuario] = useState([]);
  const [idPersona, setIdPersona] = useState("");
  const [idRol, setIdRol] = useState("");
  const [idEstado, setIdEstado] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usuariolista, setusuariolista] = useState([]);
  const [editarUser, seteditarUser] = useState(false);
  const [roles, setRoles] = useState([]);
  const [estados, setEstados] = useState([]);

  // Mostrar todos los empleados en la tabla
  useEffect(() => {
    const obtenerListaPersonas = async () => {
      try {
        const response = await fetch('http://localhost:3001/obtenerlistapersonas');
        const data = await response.json();
        setPersonas(data); // Guarda los datos en tu estado
      } catch (error) {
        console.error('Error al obtener las personas:', error);
      }
    };

    obtenerListaPersonas();
  }, []);

  // Mostrar todos los empleados sin un usuario asignado en el select al crear un nuevo usuario
  const obtenerPersonasSinUsuario = async () => {
    try {
      const response = await fetch('http://localhost:3001/obtenerpersona');
      const data = await response.json();
      setPersonasSinUsuario(data); // Guarda los datos en tu estado
    } catch (error) {
      console.error('Error al obtener las personas:', error);
    }
  };

  useEffect(() => {
    obtenerPersonasSinUsuario();
  }, []);

  // Obtener estados
  useEffect(() => {
    const obtenerestado = async () => {
      try {
        const response = await fetch('http://localhost:3001/obtenerestado');
        const data = await response.json();
        setEstados(data); // Guarda los datos en tu estado
      } catch (error) {
        console.error('Error al obtener las Estados:', error);
      }
    };

    obtenerestado();
  }, []);

  // Obtener roles
  useEffect(() => {
    const obtenerrol = async () => {
      try {
        const response = await fetch('http://localhost:3001/obtenerrol');
        const data = await response.json();
        setRoles(data); // Guarda los datos en tu estado
      } catch (error) {
        console.error('Error al obtener roles:', error);
      }
    };

    obtenerrol();
  }, []);

  // Agregar usuario
  const addUser = () => {
    Axios.post("http://localhost:3001/create-usuario", {
      id_persona: idPersona,
      rol_id: idRol,
      estado_id: idEstado,
      username: username,
      password: password
    }).then(() => {
      listaUsuarios();
      obtenerPersonasSinUsuario();
      limpiarcampos();
      Swal.fire({
        title: "<strong>Registro exitoso!!!</strong>",
        html: "<i><strong>" + username + "</strong> fue registrado con éxito</i>",
        icon: "success",
        timer: 3000,
      });
    })
    .catch((error) => {
      console.error("Error al registrar el usuario:", error.response ? error.response.data : error.message);
      Swal.fire({
        title: "<strong>Error al registrar</strong>",
        html: "<i>" + (error.response?.data?.message || "Ocurrió un error inesperado.") + "</i>",
        icon: "error",
        timer: 3000,
      });
    });
  };

  // Actualizar usuario
  const updateUser = () => {
    console.log("Updating user with ID:", id);
    console.log("User data:", {
      id_usuario: id,
      id_persona: idPersona,
      rol_id: idRol,
      estado_id: idEstado,
      username: username,
      password: password,
    });
    
    Axios.put("http://localhost:3001/updateuser", {
      id_usuario: id,
      id_persona: idPersona,
      rol_id: idRol,
      estado_id: idEstado,
      username: username,
      password: password,
    }).then(() => {
      listaUsuarios();
      limpiarcampos();
      
      Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: "<i><strong>" + username + "</strong> fue actualizado con éxito</i>",
        icon: "success",
        timer: 2500,
      });
    }).catch(error => {
      console.error("Error updating user:", error);
      
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el usuario.",
        icon: "error",
      });
    });
  };

  // Limpiar campos
  const limpiarcampos = () => {
    setIdPersona("");
    setIdRol("");
    setIdEstado("");
    setUsername("");
    setPassword("");
    setId("");
    seteditarUser(false);
  };

  // Editar usuario
  const editarUsuario = (val) => {
    seteditarUser(true);
    setIdPersona(val.id_persona);
    setIdRol(val.rol_id);
    setIdEstado(val.estado_id);
    setUsername(val.username);
    setPassword(val.password);
    setId(val.id_usuario)
  }

  // Obtener lista de usuarios
  const listaUsuarios = () => {
    Axios.get("http://localhost:3001/obteneruser").then((response) => {
      setusuariolista(response.data);
    });
  };
  
  listaUsuarios();

  return (
    <AllowedAccess 

  roles={["admin"]} 
  permissions="manage-users" 
  renderAuthFailed={<p>No tienes permiso para ver esto.</p>}
  isLoading={<p>Cargando...</p>}
>
  <div className="container mt-4">
    <div className="card text-center mb-4 shadow-sm">
      <div className="card-header bg-orange text-white">CREACION DE USUARIO</div>
      <div className="card-body bg-light-orange">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><i className="bi bi-person"></i></span>
          <select value={idPersona} onChange={(e) => setIdPersona(e.target.value)} className="form-select">
            <option value="">Seleccione un empleado</option>
            {personasSinUsuario.map((persona) => (
              <option key={persona.id} value={persona.id}>
                {persona.primer_nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><i className="bi bi-people"></i></span>
          <select value={idRol} onChange={(e) => setIdRol(e.target.value)} className="form-select">
            <option value="">Seleccione un rol</option>
            {roles.map((rol) => (
              <option key={rol.id_rol} value={rol.id_rol}>
                {rol.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><i className="bi bi-toggle-on"></i></span>
          <select value={idEstado} onChange={(e) => setIdEstado(e.target.value)} className="form-select">
            <option value="">Seleccione un estado</option>
            {estados.map((estado_usuario) => (
              <option key={estado_usuario.id_estado} value={estado_usuario.id_estado}>
                {estado_usuario.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><i className="bi bi-person-circle"></i></span>
          <input type="text" onChange={(event) => setUsername(event.target.value)} className="form-control" value={username} />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><i className="bi bi-lock"></i></span>
          <input type="password" onChange={(event) => setPassword(event.target.value)} className="form-control" value={password} />
        </div>
      </div>
      <div className="card-footer text-muted">
        {editarUser ? (
          <div>
            <button className="btn btn-orange m-2" onClick={updateUser}><i className="bi bi-pencil"></i> Actualizar Usuario</button>
            <button className="btn btn-info m-2" onClick={addUser}><i className="bi bi-x-circle"></i> Cancelar</button>
          </div>
        ) : (
          <button className="btn btn-orange" onClick={addUser}><i className="bi bi-person-plus-fill"></i> Registrar Usuario</button>
        )}
      </div>
    </div>

    {/* Tabla de Lista de Usuarios */}
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr className="table-orange">
            <th scope="col">#</th>
            <th scope="col">Empleado</th>
            <th scope="col">Rol</th>
            <th scope="col">Estado</th>
            <th scope="col">Usuario</th>
            <th scope="col">Contraseña</th>
            <th scope="col">Fecha de creación</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariolista.map((val) => {
            const empleado = personas.find(p => p.id === val.id_persona);
            const rol = roles.find(r => r.id_rol === val.rol_id);
            const estado = estados.find(e => e.id_estado === val.estado_id);

            return (
              <tr key={val.id_usuario}>
                <th>{val.id_usuario}</th>
                <td>{empleado ? empleado.primer_nombre : "No disponible"}</td>
                <td>{rol ? rol.nombre : "No disponible"}</td>
                <td>{estado ? estado.descripcion : "No disponible"}</td>
                <td>{val.username}</td>
                <td>{val.password}</td>
                <td>{val.fecha_creacion}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={() => editarUsuario(val)} className="btn btn-orange">
                      <i className="bi bi-pencil"></i> Editar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
</AllowedAccess>
  ); 
}

export default Usuario;