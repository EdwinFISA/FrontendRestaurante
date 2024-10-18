import "../style/empleado.css";
import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { AllowedAccess } from 'react-permission-role';


function ReporteUser() {
    const [personas, setPersonas] = useState([]);
    const [usuariolista, setusuariolista] = useState([]);
    const [roles, setRoles] = useState([]);
    const [estados, setEstados] = useState([]);

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Estado para ordenación
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    // Referencia para el contenido del reporte
    const reportRef = useRef();

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

    // Lógica de paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Cambio de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Cálculo de paginación
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
                aField = personas.find((p) => p.id === a.id_persona)?.primer_nombre || "";
                bField = personas.find((p) => p.id === b.id_persona)?.primer_nombre || "";
            } else if (sortConfig.key === "apellido") {
                aField = personas.find((p) => p.id === a.id_persona)?.primer_apellido || "";
                bField = personas.find((p) => p.id === b.id_persona)?.primer_apellido || "";
            } else if (sortConfig.key === "rol") {
                aField = roles.find((r) => r.id_rol === a.rol_id)?.nombre || "";
                bField = roles.find((r) => r.id_rol === b.rol_id)?.nombre || "";
            } else if (sortConfig.key === "estado") {
                aField = estados.find((e) => e.id_estado === a.estado_id)?.descripcion || "";
                bField = estados.find((e) => e.id_estado === b.estado_id)?.descripcion || "";
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

    // Función para generar el PDF
    const generarPDF = () => {
        const input = reportRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const imgWidth = 210; // Ancho en mm para A4
            const pageHeight = 295; // Altura en mm para A4
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save("reporte_usuarios.pdf");
        });
    };

    return (
        <AllowedAccess 
        roles={["admin"]} 
        permissions="manage-users" /*view-report*/
        renderAuthFailed={<p>No tienes permiso para ver esto.</p>}
        isLoading={<p>Cargando...</p>}
    >
        <div className="container">
            <h1>Informe de Usuarios Activo o Inactivo</h1>
            <br />
            <div ref={reportRef}>
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
            </div>
            <div className="d-flex justify-content-end"> {/* Botón alineado a la derecha */}
                <button className="btn btn-primary" onClick={generarPDF}>
                    Generar PDF
                </button>
            </div>
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

export default ReporteUser;
