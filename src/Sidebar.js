import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showRegistros, setShowRegistros] = useState(false);
    const [showMenu, setShowMenu] = useState(false); // Estado para mostrar/ocultar submenú de Menu

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleRegistros = () => {
        setShowRegistros(!showRegistros);
        setShowMenu(false); // Cierra el submenú de Menu si está abierto
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        setShowRegistros(false); // Cierra el submenú de Registros si está abierto
    };

    return (
        <>
            <button
                className="btn btn-dark d-md-none m-3"
                onClick={toggleSidebar}
            >
                <i className="bi bi-list"></i>
            </button>

            <div
                className={`bg-dark text-white vh-100 p-3 d-flex flex-column ${isOpen ? 'd-block' : 'd-none'} d-md-block`}
                style={{ minWidth: '225px' }}
            >
                <h4 className="text-white">MiraLago</h4>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link to="/home" className="nav-link text-white d-flex align-items-center">
                            <i className="bi bi-house-door-fill me-2"></i>
                            <span>Home</span>
                        </Link>
                    </li>

                    {/* Opción Registros */}
                    <li className="nav-item mb-2">
                        <button
                            className="btn btn-link nav-link text-white d-flex align-items-center"
                            onClick={toggleRegistros}
                        >
                            <i className="bi bi bi-person-rolodex me-2"></i>
                            <span className="me-3">Usuarios</span>
                            <i className={`bi ms-auto ${showRegistros ?  'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                        </button>

                        {/* Submenú  */}
                        {showRegistros && (
                            <ul className="nav flex-column ms-3">
                                <li className="nav-item mb-2">
                                    <Link to="/usuario" className="nav-link text-white d-flex align-items-center">
                                        <i className="bi bi-person-fill me-2"></i>
                                        <span>Usuario</span>
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/empleado" className="nav-link text-white d-flex align-items-center">
                                        <i className="bi bi-person-badge-fill me-2"></i>
                                        <span>Empleado</span>
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/reporteuser" className="nav-link text-white d-flex align-items-center">
                                        <i className="bi bi-person-lines-fill me-2"></i>
                                        <span>Reporte Usuarios</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Opciónes MENU */}
                    <li className="nav-item mb-2">
                        <button
                            className="btn btn-link nav-link text-white d-flex align-items-center"
                            onClick={toggleMenu}
                        >
                            <i className="bi bi-card-checklist me-2"></i>
                            <span className="me-3">Menu</span>
                            <i className={`bi ms-auto ${showMenu ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                        </button>

                        {/* Submenú  */}
                        {showMenu && (
                            <ul className="nav flex-column ms-3">
                                <li className="nav-item mb-2">
                                    <Link to="/categoriaplato" className="nav-link text-white d-flex align-items-center">
                                        <i className="bi bi-menu-button-fill me-2"></i>
                                        <span>Categoria Platillo</span>
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/plato" className="nav-link text-white d-flex align-items-center">
                                        <i className="bi bi-egg-fried me-2"></i>
                                        <span>Platillo</span>
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/mesa" className="nav-link text-white d-flex align-items-center">
                                        <i className="bi bi-align-top me-2"></i>
                                        <span>Mesa</span>
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/orden" className="nav-link text-white d-flex align-items-center">
                                        <i className="bi bi-receipt me-2"></i>
                                        <span>Orden</span>
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/detalleorden" className="nav-link text-white d-flex align-items-center">
                                        <i className="bi bi-receipt-cutoff me-2"></i>
                                        <span>Detalle Orden</span>
                                    </Link>
                                </li>
                                {/*
                                <li className="nav-item mb-2">
                                    <Link to="/reporteuser" className="nav-link text-white d-flex align-items-center">
                                        <i className="bi bi-person-lines-fill me-2"></i>
                                        <span>Reporte Usuarios</span>
                                    </Link>
                                </li>*/}
                            </ul>
                        )}
                    </li>
                    
                    <li className="nav-item mb-2">
                        <Link to="/ajustes" className="nav-link text-white d-flex align-items-center">
                            <i className="bi bi-gear-fill me-2"></i>
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/logout" className="nav-link text-white d-flex align-items-center">
                            <i className="bi bi-box-arrow-left me-2"></i>
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
