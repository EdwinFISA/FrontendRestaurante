import "../style/empleado.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { AllowedAccess } from 'react-permission-role';

function Empleado() {
  const [id, setId] = useState("");
  const [primerNombre, setprimerNombre] = useState("");
  const [segundoNombre, setsegundoNombre] = useState("");
  const [primerApellido, setprimerApellido] = useState("");
  const [segundoApellido, setsegundoApellido] = useState("");
  const [telefono, settelefono] = useState();
  const [email, setemail] = useState("");
  const [personalist, setpersona] = useState([]);
  const [editar, seteditarpersona] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Numero de Informacion de pag
  const [searchTerm, setSearchTerm] = useState(""); 

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      primer_nombre: primerNombre,
      segundo_nombre: segundoNombre,
      primer_apellido: primerApellido,
      segundo_apellido: segundoApellido,
      telefono: telefono,
      email: email,
    }).then(() => {
      getPersona();
      limpiarcampos();
      Swal.fire({
        title: "<strong>Registro exitoso!!!</strong>",
        html: "<i><strong>" + primerNombre + " " + primerApellido + "</strong> fue registrado con éxito</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      primer_nombre: primerNombre,
      segundo_nombre: segundoNombre,
      primer_apellido: primerApellido,
      segundo_apellido: segundoApellido,
      telefono: telefono,
      email: email,
    }).then(() => {
      getPersona();
      limpiarcampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: "<i><strong>" + primerNombre + " " + primerApellido + "</strong> fue actualizado con éxito</i>",
        icon: "success",
        timer: 2500,
      });
    });
  };

  const deletepersona = (val) => {
    Swal.fire({
      title: "Confirmar Eliminado",
      html: "<i>¿Está seguro que desea eliminar a <strong>" + val.primer_nombre + " " + val.primer_apellido + "</strong> ?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#F44336",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getPersona();
          limpiarcampos();
          Swal.fire({
            title: "Eliminado!",
            html: "<strong>" + val.primer_nombre + " " + val.primer_apellido + "</strong> fue eliminado",
            icon: "success",
            timer: 2000,
          });
        }).catch(function (error) {
          const errorMessage = error.response?.data?.message || "No se logró eliminar a <strong>" + val.primer_nombre + " " + val.primer_apellido + "</strong>";
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: errorMessage,
            footer: error.message === "Network Error" ? "Intente más tarde" : error.message
          });
        });
      }
    });
  };

  const limpiarcampos = () => {
    setprimerNombre("");
    setsegundoNombre("");
    setprimerApellido("");
    setsegundoApellido("");
    settelefono("");
    setemail("");
    setId("");
    seteditarpersona(false);
  };

  const editarpersona = (val) => {
    seteditarpersona(true);
    setprimerNombre(val.primer_nombre);
    setsegundoNombre(val.segundo_nombre);
    setprimerApellido(val.primer_apellido);
    setsegundoApellido(val.segundo_apellido);
    settelefono(val.telefono);
    setemail(val.email);
    setId(val.id);
  };

  const getPersona = () => {
    Axios.get("http://localhost:3001/obtenerlistapersonas").then((response) => {
      setpersona(response.data);
    });
  };

  useEffect(() => {
    getPersona();
  }, []);

  const filteredPersonalist = personalist.filter((persona) => {
    return (
      persona.primer_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.segundo_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.primer_apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.segundo_apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      persona.telefono.includes(searchTerm) ||
      persona.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPersonalist.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPersonalist.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AllowedAccess 
      roles={["admin"]} 
      permissions="manage-users" 
      renderAuthFailed={<p>No tienes permiso para ver esto.</p>}
      isLoading={<p>Cargando...</p>}
    >
      <div className="container">
        <div className="card text-center">
          <div className="card-header">FORMULARIO DE EMPLEADOS</div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Primer nombre: </span>
              <input
                type="text"
                onChange={(event) => setprimerNombre(event.target.value)}
                className="form-control"
                value={primerNombre}
                placeholder="Ingrese su Primer Nombre"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Segundo Nombre: </span>
              <input
                type="text"
                onChange={(event) => setsegundoNombre(event.target.value)}
                value={segundoNombre}
                className="form-control"
                placeholder="Ingrese su Segundo Nombre"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Primer Apellido: </span>
              <input
                type="text"
                onChange={(event) => setprimerApellido(event.target.value)}
                value={primerApellido}
                className="form-control"
                placeholder="Ingrese su Primer Apellido"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Segundo Apellido: </span>
              <input
                type="text"
                onChange={(event) => setsegundoApellido(event.target.value)}
                value={segundoApellido}
                className="form-control"
                placeholder="Ingrese su Segundo Apellido"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"> Telefono: </span>
              <input
                type="number"
                onChange={(event) => settelefono(event.target.value)}
                value={telefono}
                className="form-control"
                placeholder="Ingrese su telefono"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Direccion: </span>
              <input
                type="text"
                onChange={(event) => setemail(event.target.value)}
                value={email}
                className="form-control"
                placeholder="Ingrese su Direccion"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <div className="card-footer text-muted">
            {editar ? (
              <div>
                <button className="btn btn-warning m-2" onClick={update}>Actualizar persona</button>
                <button className="btn btn-info m-2" onClick={limpiarcampos}>Cancelar</button>
              </div>
            ) : (
              <button className="btn btn-success" onClick={add}>Registrar</button>
            )}
          </div>
        </div>

        <div className="mb-3">
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="form-control mt-3" 
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)} 
          />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Primer Nombre</th>
                <th>Segundo Nombre</th>
                <th>Primer Apellido</th>
                <th>Segundo Apellido</th>
                <th>Telefono</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.id}</td>
                    <td>{val.primer_nombre}</td>
                    <td>{val.segundo_nombre}</td>
                    <td>{val.primer_apellido}</td>
                    <td>{val.segundo_apellido}</td>
                    <td>{val.telefono}</td>
                    <td>{val.email}</td>
                    <td>
                      <button className="btn btn-info" onClick={() => editarpersona(val)}>Editar</button>
                      <button className="btn btn-danger" onClick={() => deletepersona(val)}>Eliminar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <nav>
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
                <button className="page-link" onClick={() => paginate(number)}>{number}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </AllowedAccess>
  );
}

export default Empleado;
