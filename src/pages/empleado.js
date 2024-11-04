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
    })
    .then(() => {
      getPersona();
      limpiarcampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: `<i><strong>${primerNombre} ${primerApellido}</strong> fue actualizado con éxito</i>`,
        icon: "success",
        timer: 2500,
      });
    })
    .catch((error) => {
      console.error("Error actualizando los datos:", error);
      Swal.fire({
        title: "<strong>Error de actualización</strong>",
        html: "<i>Ocurrió un error al actualizar los datos. Inténtalo de nuevo.</i>",
        icon: "error",
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
    <div className="container mt-4">
        <div className="card text-center">
            <div className="card-header bg-orange text-white">FORMULARIO DE EMPLEADOS</div>
            <div className="card-body">
                {/** Formulario de ingreso de empleados */}
                {['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'telefono', 'email'].map((field, index) => (
                    <div className="input-group mb-3" key={index}>
                        <span className="input-group-text" id={`basic-addon${index + 1}`}>
                            {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
                        </span>
                        <input
                            type={field === 'telefono' ? 'number' : 'text'}
                            onChange={(event) => {
                                switch (field) {
                                    case 'primerNombre':
                                        setprimerNombre(event.target.value);
                                        break;
                                    case 'segundoNombre':
                                        setsegundoNombre(event.target.value);
                                        break;
                                    case 'primerApellido':
                                        setprimerApellido(event.target.value);
                                        break;
                                    case 'segundoApellido':
                                        setsegundoApellido(event.target.value);
                                        break;
                                    case 'telefono':
                                        settelefono(event.target.value);
                                        break;
                                    case 'email':
                                        setemail(event.target.value);
                                        break;
                                    default:
                                        break;
                                }
                            }}
                            value={field === 'primerNombre' ? primerNombre :
                                  field === 'segundoNombre' ? segundoNombre :
                                  field === 'primerApellido' ? primerApellido :
                                  field === 'segundoApellido' ? segundoApellido :
                                  field === 'telefono' ? telefono :
                                  email}
                            className="form-control"
                            placeholder={`Ingrese su ${field.replace(/([A-Z])/g, ' $1')}`}
                            aria-label={field}
                            aria-describedby={`basic-addon${index + 1}`}
                        />
                    </div>
                ))}
            </div>
            <div className="card-footer text-muted">
                {editar ? (
                    <div>
                        <button className="btn btn-warning m-2" onClick={update}>
                            Actualizar persona
                        </button>
                        <button className="btn btn-info m-2" onClick={add}>
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <button className="btn btn-success" onClick={add}>
                        Registrar persona
                    </button>
                )}
            </div>
        </div>

        <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mb-3"
        />

        {/** Tabla de empleados */}
        <table className="table table-striped table-responsive">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Primer Nombre</th>
                    <th scope="col">Segundo Nombre</th>
                    <th scope="col">Primer Apellido</th>
                    <th scope="col">Segundo Apellido</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Email</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((val) => (
                    <tr key={val.id}>
                        <th>{val.id}</th>
                        <td>{val.primer_nombre}</td>
                        <td>{val.segundo_nombre}</td>
                        <td>{val.primer_apellido}</td>
                        <td>{val.segundo_apellido}</td>
                        <td>{val.telefono}</td>
                        <td>{val.email}</td>
                        <td>
                            <div className="btn-group" role="group">
                                <button
                                    type="button"
                                    onClick={() => editarpersona(val)}
                                    className="btn btn-info"
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => deletepersona(val)}
                                    className="btn btn-danger"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        {/** Paginación */}
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a
                            href="#!"
                            className="page-link"
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    </div>
</AllowedAccess>

  );
}

export default Empleado;
