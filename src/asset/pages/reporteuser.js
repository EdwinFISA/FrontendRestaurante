import "../style/empleado.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ReporteUser() {
    const [personas, setPersonas] = useState([]);
    const [usuariolista, setusuariolista] = useState([]);
    const [roles, setRoles] = useState([]);
    const [estados, setEstados] = useState([]);
    
    // Paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; 

    // Estado para ordenación
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    useEffect(() => {
        Axios.get("http://localhost:3001/obtenerlistapersonas")
            .then((response) => setPersonas(response.data))
            .catch((error) => console.error("Error fetching employees:", error));

        Axios.get("http://localhost:3001/obtenerrol")
            .then((response) => setRoles(response.data))
            .catch((error) => console.error("Error fetching roles:", error));

        Axios.get("http://localhost:3001/obtenerestado")
            .then((response) => setEstados(response.data))
            .catch((error) => console.error("Error fetching states:", error));

        getUsuario();
    }, []);

    const getUsuario = () => {
        Axios.get("http://localhost:3001/obteneruser")
            .then((response) => {
                setusuariolista(response.data);
            })
            .catch((error) => console.error("Error fetching users:", error));
    };

    // Logica de paginacion
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //const currentItems = usuariolista.slice(indexOfFirstItem, indexOfLastItem);

    // Cambio de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculo de paginacion
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(usuariolista.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Función para manejar la ordenación
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedItems = [...usuariolista].sort((a, b) => {
        if (sortConfig.key) {
            let aField, bField;

            if (sortConfig.key === "empleado") {
                aField = personas.find(p => p.id === a.id_persona)?.primer_nombre || "";
                bField = personas.find(p => p.id === b.id_persona)?.primer_nombre || "";
            } else if (sortConfig.key === "apellido") {
                aField = personas.find(p => p.id === a.id_persona)?.primer_apellido || "";
                bField = personas.find(p => p.id === b.id_persona)?.primer_apellido || "";
            } else if (sortConfig.key === "rol") {
                aField = roles.find(r => r.id_rol === a.rol_id)?.nombre || "";
                bField = roles.find(r => r.id_rol === b.rol_id)?.nombre || "";
            } else if (sortConfig.key === "estado") {
                aField = estados.find(e => e.id_estado === a.estado_id)?.descripcion || "";
                bField = estados.find(e => e.id_estado === b.estado_id)?.descripcion || "";
            } else {
                aField = a[sortConfig.key];
                bField = b[sortConfig.key];
            }

            if (aField < bField) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (aField > bField) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
        }
        return 0;
    });

    const currentSortedItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container">
            <h1>Informe de Usuarios Activo o Inactivo</h1>
            <br />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col" onClick={() => handleSort("id_usuario")}>Id</th>
                        <th scope="col" onClick={() => handleSort("empleado")}>Empleado</th>
                        <th scope="col" onClick={() => handleSort("apellido")}>Apellido</th>
                        <th scope="col" onClick={() => handleSort("rol")}>Rol</th>
                        <th scope="col" onClick={() => handleSort("estado")}>Estado</th>
                        <th scope="col" onClick={() => handleSort("username")}>Usuario</th>
                        <th scope="col" onClick={() => handleSort("fecha_creacion")}>Fecha de creación</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSortedItems.map((val) => {
                        const empleado = personas.find((p) => p.id === val.id_persona);
                        const rol = roles.find((r) => r.id_rol === val.rol_id);
                        const estado = estados.find((e) => e.id_estado === val.estado_id);

                        return (
                            <tr key={val.id_usuario}>
                                <th>{val.id_usuario}</th>
                                <td>{empleado ? empleado.primer_nombre : "No disponible"}</td>
                                <td>{empleado ? empleado.primer_apellido : "No disponible"}</td>
                                <td>{rol ? rol.nombre : "No disponible"}</td>
                                <td>{estado ? estado.descripcion : "No disponible"}</td>
                                <td>{val.username}</td>
                                <td>{val.fecha_creacion}</td>
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

export default ReporteUser;
