import "../style/empleado.css";
import { useState, useEffect } from "react";
// Instalar axios con: npm install axios
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

function Categoriaplato() {
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");

    const [categoriasList, setCategoriasList] = useState([]);

    const [editar, setEditar] = useState(false);
    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Número de información por página
    const [searchTerm, setSearchTerm] = useState("");

    const guardar = () => {
        Axios.post("http://localhost:3001/categoria/guardar", {
            nombre: nombre,
        }).then(() => {
            listarCategorias();
            limpiarCampos();
            Swal.fire({
                title: "<strong>Registro exitoso!!!</strong>",
                html: `<i><strong>${nombre}</strong> fue registrado con éxito</i>`,
                icon: "success",
                timer: 3000,
            });
        });
    };

    const actualizar = () => {
        Axios.put("http://localhost:3001/categoria/actualizar", {
            id: id,
            nombre: nombre,
        }).then(() => {
            listarCategorias();
            limpiarCampos();
            Swal.fire({
                title: "<strong>Actualización exitosa!!!</strong>",
                html: `<i><strong>${nombre}</strong> fue actualizado con éxito</i>`,
                icon: "success",
                timer: 2500,
            });
        });
    };

    const eliminarCategoria = (val) => {
        Swal.fire({
            title: "Confirmar Eliminado",
            html: `<i>¿Está seguro que desea eliminar <strong>${val.nombre}</strong> ?</i>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#F44336",
            confirmButtonText: "Sí, eliminarlo!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:3001/categoria/eliminar/${val.id}`).then(() => {
                    listarCategorias();
                    limpiarCampos();
                    Swal.fire({
                        title: "Eliminado!",
                        html: `<strong>${val.nombre}</strong> fue eliminado`,
                        icon: "success",
                        timer: 2000,
                    });
                }).catch(function (error) {
                    const errorMessage = error.response?.data?.message || `No se logró eliminar <strong>${val.nombre}</strong>`;
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        html: errorMessage,
                        footer: error.message === "Network Error" ? "Intente más tarde" : error.message,
                    });
                });
            }
        });
    };

    const limpiarCampos = () => {
        setNombre("");
        setId("");
        setEditar(false);
    };

    const editarCategoria = (val) => {
        setEditar(true);
        setNombre(val.nombre);
        setId(val.id);
    };

    const listarCategorias = () => {
        Axios.get("http://localhost:3001/categoria/listar").then((response) => {
            setCategoriasList(response.data);
        });
    };

    // Efecto para cargar datos al montar el componente
    useEffect(() => {
        listarCategorias();
    }, []);

    // Filtrar la lista de categorías
    const filteredCategoriasList = categoriasList.filter((categoria) => {
        return categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCategoriasList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCategoriasList.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <div className="card text-center">
                <div className="card-header">FORMULARIO DE CATEGORÍAS</div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Nombre:{" "}
                        </span>
                        <input
                            type="text"
                            onChange={(event) => {
                                setNombre(event.target.value);
                            }}
                            className="form-control"
                            value={nombre}
                            placeholder="Ingrese el nombre de la categoría"
                            aria-label="Nombre"
                            aria-describedby="basic-addon1"
                        />
                    </div>
                </div>
                <div className="card-footer text-muted">
                    {editar ? (
                        <div>
                            <button className="btn btn-warning m-2" onClick={actualizar}>
                                Actualizar categoría
                            </button>
                            <button className="btn btn-info m-2" onClick={limpiarCampos}>
                                Cancelar
                            </button>
                        </div>
                    ) : (
                        <button className="btn btn-success" onClick={guardar}>
                            Registrar categoría
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
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((val) => {
                        return (
                            <tr key={val.id}>
                                <th>{val.id}</th>
                                <td>{val.nombre}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                editarCategoria(val);
                                            }}
                                            className="btn btn-info"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                eliminarCategoria(val);
                                            }}
                                            className="btn btn-danger"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
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
    );
}

export default Categoriaplato;


