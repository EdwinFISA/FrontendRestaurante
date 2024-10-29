import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showRegistros, setShowRegistros] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleRegistros = () => {
        setShowRegistros(!showRegistros);
        setShowMenu(false);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        setShowRegistros(false);
    };

    return (
        <>
            <button
                className="btn d-md-none m-3"
                onClick={toggleSidebar}
                style={{ backgroundColor: '#FF6700', color: 'white' }}
            >
                <i className="bi bi-list"></i>
            </button>

            <div
                className={`vh-100 p-3 d-flex flex-column ${isOpen ? 'd-block' : 'd-none'} d-md-block`}
                style={{ minWidth: '225px', backgroundColor: '#FF6700', color: 'white' }}
            >
                <h4 className="text-white">MiraLago</h4>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link to="/home" className="nav-link text-white d-flex align-items-center">
                            <i className="bi bi-house-door-fill me-2"></i>
                            <span>Home</span>
                        </Link>
                    </li>

                    <li className="nav-item mb-2">
                        <button
                            className="btn btn-link nav-link text-white d-flex align-items-center"
                            onClick={toggleRegistros}
                        >
                            <i className="bi bi-person-rolodex me-2"></i>
                            <span className="me-3">Usuarios</span>
                            <i className={`bi ms-auto ${showRegistros ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                        </button>

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
                                <li className="nav-item mb-2">
                                    <Link to="/reporteempleado" className="nav-link text-white d-flex align-items-center">
                                        <i className="bi bi-person-video2 me-2"></i>
                                        <span>Reporte Empleados</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li className="nav-item mb-2">
                        <button
                            className="btn btn-link nav-link text-white d-flex align-items-center"
                            onClick={toggleMenu}
                        >
                            <i className="bi bi-card-checklist me-2"></i>
                            <span className="me-3">Menu</span>
                            <i className={`bi ms-auto ${showMenu ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                        </button>

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
                                <li className="nav-item mb-2">
                                    <Link to="/reporteplato" className="nav-link text-white d-flex align-items-center">
                                        <i className="bi bi-card-heading me-2"></i>
                                        <span>Reporte Platillo</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
<<<<<<< HEAD

=======
                    <li className="nav-item mb-2">
                        <Link to="/frontmesero" className="nav-link text-white d-flex align-items-center">
                            <i className="<'food-menu'"></i>
                            <span>Mesero</span>
                        </Link>
                    </li>
>>>>>>> c36dd0d23eeb68f4b9d4b3568ad60ebc44050a53
                    <li className="nav-item mb-2">
                        <Link to="/ajustes" className="nav-link text-white d-flex align-items-center">
                            <i className="bi bi-gear-fill me-2"></i>
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/Logout" className="nav-link text-white d-flex align-items-center">
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
