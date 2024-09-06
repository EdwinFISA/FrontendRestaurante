import "./App.css";
import { useState, useEffect } from "react";
//instalar axios npm install axios
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";



function App() {
  const [id, setId] = useState("");
  const [primerNombre, setprimerNombre] = useState("");
  const [segundoNombre, setsegundoNombre] = useState("");
  const [primerApellido, setprimerApellido] = useState("");
  const [segundoApellido, setsegundoApellido] = useState("");
  const [telefono, settelefono] = useState();
  //const [direccion, setdireccion] = useState("");
  const [email, setemail] = useState("");

  

  const [editar, seteditarpersona] = useState(false);

  const [personalist, setpersona] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // numero de datos que se muestran en la tabla

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      primer_nombre: primerNombre,
      segundo_nombre: segundoNombre,
      primer_apellido: primerApellido,
      segundo_apellido: segundoApellido,
      telefono: telefono,
      // direccion:direccion
      email: email,
    }).then(() => {
      getPersona();
      limpiarcampos();
      Swal.fire({
        title: "<strong>Registro exitoso!!!</strong>",
        html: "<i><strong>" + primerNombre + " " + primerApellido + "</strong> fue registrado con éxito</i>",
        icon: "success",
        timer: 3000,
      })
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
      // direccion:direccion
      email: email,
    }).then(() => {
      getPersona();
      limpiarcampos();
      Swal.fire({
        title: "<strong>Actualicación exitosa!!!</strong>",
        html: "<i><strong>" + primerNombre + " " + primerApellido + "</strong> fue actualizado con éxito</i>",
        icon: "success",
        timer: 2500,
      })
    });
  };

  const deletepersona = (val) => {
    Swal.fire({
      title: "Confirmar Eliminado",
      html: "<i>¿Esta seguro que desea eliminar a <strong>" + val.primer_nombre + " " + val.primer_apellido + "</strong> ?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#F44336",
      confirmButtonText: "Si, elimminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getPersona();
          limpiarcampos();
          Swal.fire({
            title: "Eliminado!",
            html: "<strong>" + val.primer_nombre + " " + val.primer_apellido + "</strong> Fuel eliminado",
            icon: "success",
            timer: 2000,
          });
        }).catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: "No se logro eliminar a <strong>" + val.primer_nombre + " " + val.primer_apellido + "</strong>",
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
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
    Axios.get("http://localhost:3001/obtenerpersona").then((response) => {
      setpersona(response.data);
    });
  };


  //PAGINACION
  // Efecto para cargar datos al montar el componente
  useEffect(() => {
    getPersona();
  }, []);

  // Calcular los índices de los elementos a mostrar
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = personalist.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(personalist.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      
      {/*Aqui va la pagina web o el login */}
      <div className="card text-center">
        <div className="card-header">FORMULARIO DE PERSONAS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Primer nombre:{" "}
            </span>
            <input
              type="text"
              onChange={(event) => {
                setprimerNombre(event.target.value);
              }}
              className="form-control"
              value={primerNombre}
              placeholder="Ingrese su Primer Nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Segundo Nombre:{" "}
            </span>
            <input
              type="text"
              onChange={(event) => {
                setsegundoNombre(event.target.value);
              }}
              value={segundoNombre}
              className="form-control"
              placeholder="Ingrese su Segundo Nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Primer Apellido:{" "}
            </span>
            <input
              type="text"
              onChange={(event) => {
                setprimerApellido(event.target.value);
              }}
              value={primerApellido}
              className="form-control"
              placeholder="Ingrese su Primer Apellido"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Segundo Apellido:{" "}
            </span>
            <input
              type="text"
              onChange={(event) => {
                setsegundoApellido(event.target.value);
              }}
              value={segundoApellido}
              className="form-control"
              placeholder="Ingrese su Segundo Apellido"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              {" "}
              Telefono:{" "}
            </span>
            <input
              type="number"
              onChange={(event) => {
                settelefono(event.target.value);
              }}
              value={telefono}
              className="form-control"
              placeholder="Ingrese su telefono"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Email:{" "}
            </span>
            <input
              type="email"
              onChange={(event) => {
                setemail(event.target.value);
              }}
              value={email}
              className="form-control"
              placeholder="Ingrese su email"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
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
      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
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
            {currentItems.map((val, key) => {
              return (
                <tr key={val.id}>
                  <th>{val.id}</th>
                  <td>{val.primer_nombre}</td>
                  <td>{val.segundo_nombre}</td>
                  <td>{val.primer_apellido}</td>
                  <td>{val.segundo_apellido}</td>
                  <td>{val.telefono}</td>
                  <td>{val.email}</td>
                  <td>
                    <div
                      className="btn-group" Namrole="group" aria-label="Basic example">
                      <button type="button" onClick={() => {
                          editarpersona(val);
                        }}
                        className="btn btn-info">Editar</button>
                      <button type="button" onClick={() => {
                        deletepersona(val);
                      }}
                        className="btn btn-danger">Elimina</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav>
        <ul className="pagination justify-content-end">
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
      
    </div>
  );
}
export default App;
