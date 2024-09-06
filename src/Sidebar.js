import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Botón de hamburguesa para abrir/cerrar el menú en pantallas pequeñas */}
            <button
                className="btn btn-dark d-md-none m-3"
                onClick={toggleSidebar}
            >
                <i className="bi bi-list"></i>
            </button>

            {/* Menú lateral */}
            <div
                className={`bg-dark text-white vh-100 p-3 d-flex flex-column ${isOpen ? 'd-block' : 'd-none'} d-md-block`}
                style={{ minWidth: '250px' }}
            >
                <h4 className="text-white">MiraLago</h4>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link to="/" className="nav-link text-white d-flex align-items-center">
                            <i className="bi bi-house-door-fill me-2"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/profile" className="nav-link text-white d-flex align-items-center">
                            <i className="bi bi-person-fill me-2"></i>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/settings" className="nav-link text-white d-flex align-items-center">
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
