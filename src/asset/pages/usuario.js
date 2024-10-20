import "../style/empleado.css";
import React, { useState, useEffect } from 'react';
//instalar axios npm install axios
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { AllowedAccess } from 'react-permission-role';

function Usuario() {
  //Autorizado
  //Hooks de Usuario
  const [id, setId] = useState("");/*este id es id_usuarios */
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

  /*Mostrar todos los empleados en la tabla*/
  useEffect(() => {
    const obtenerListaPersonas = async () => {
      try {
        const response = await fetch('http://localhost:3001/obtenerlistapersonas');
        const data = await response.json();
        setPersonas(data);  // Guarda los datos en tu estado
      } catch (error) {
        console.error('Error al obtener las personas:', error);
      }
    };

    obtenerListaPersonas();
  }, []);

  /*Mostrar todos los empleados sin un usuario asignado en el select al crear un nuevo usuario*/

  const obtenerPersonasSinUsuario = async () => {
    try {
      const response = await fetch('http://localhost:3001/obtenerpersona');
      const data = await response.json();
      setPersonasSinUsuario(data);  // Guarda los datos en tu estado
    } catch (error) {
      console.error('Error al obtener las personas:', error);
    }
  };
  useEffect(() => {
    obtenerPersonasSinUsuario();
  }, []);

  useEffect(() => {
    const obtenerestado = async () => {
      try {
        const response = await fetch('http://localhost:3001/obtenerestado');
        const data = await response.json();
        setEstados(data);  // Guarda los datos en tu estado
      } catch (error) {
        console.error('Error al obtener las Estados:', error);
      }
    };

    obtenerestado();
  }, []);

  useEffect(() => {
    const obtenerrol = async () => {
      try {
        const response = await fetch('http://localhost:3001/obtenerrol');
        const data = await response.json();
        setRoles(data);  // Guarda los datos en tu estado
      } catch (error) {
        console.error('Error al obtener roles:', error);
      }
    };

    obtenerrol();
  }, []);


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
        // Manejo de errores
        console.error("Error al registrar el usuario:", error.response ? error.response.data : error.message);
        Swal.fire({
          title: "<strong>Error al registrar</strong>",
          html: "<i>" + (error.response?.data?.message || "Ocurrió un error inesperado.") + "</i>",
          icon: "error",
          timer: 3000,
        });
      });
  };

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
      listaUsuarios()
      limpiarcampos();
      Swal.fire({
        title: "<strong>Actualicación exitosa!!!</strong>",
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

  const limpiarcampos = () => {
    setIdPersona("");
    setIdRol("");
    setIdEstado("");
    setUsername("");
    setPassword("");
    setId("");
    seteditarUser(false);
  };

  const editarUsuario = (val) => {
    seteditarUser(true);
    setIdPersona(val.id_persona);
    setIdRol(val.rol_id);
    setIdEstado(val.estado_id);
    setUsername(val.username);
    setPassword(val.password);
    setId(val.id_usuario)
  }

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
    <div className="container">
      <div className="card text-center">
        <div className="card-header">FORMULARIO CREAR USUARIO</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Empleado:{" "}
            </span>
            <select value={idPersona} onChange={(e) => setIdPersona(e.target.value)}>
              <option value="">Seleccione un empleado</option>
              {personasSinUsuario.map((persona) => (
                <option key={persona.id} value={persona.id}>
                  {persona.primer_nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Rol:{" "}
            </span>
            <select value={idRol} onChange={(e) => setIdRol(e.target.value)}>
              <option value="">Seleccione un rol</option>
              {roles.map((rol) => (
                <option key={rol.id_rol} value={rol.id_rol}>
                  {rol.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Estado:{" "}
            </span>
            <select value={idEstado} onChange={(e) => setIdEstado(e.target.value)}>
              <option value="">Seleccione un estado</option>
              {estados.map((estado_usuario) => (
                <option key={estado_usuario.id_estado} value={estado_usuario.id_estado}>
                  {estado_usuario.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Usuario:{" "}
            </span>
            <input
              type="text"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              className="form-control"
              value={username}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              {" "}{/*No se si esto sirva de algo verficar despues*/}
              Contraseña:{" "}
            </span>
            <input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="form-control"
              value={password}
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          {editarUser ? (
            <div>
              <button className="btn btn-warning m-2" onClick={updateUser}>
                Actualizar Usuario
              </button>
              <button className="btn btn-info m-2" onClick={addUser}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={addUser}>
              Registrar Usuario
            </button>
          )}
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
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
          {usuariolista.map((val, key) => {
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
                  <div
                    className="btn-group"
                    Namrole="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        editarUsuario(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    {/*  <button
                      type="button"
                      onClick={() => {
                        deletepersona(val);
                      }}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                    */}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </AllowedAccess>
  );
}

export default Usuario;
