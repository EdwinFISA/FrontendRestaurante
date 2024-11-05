import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/cocina.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Modal, Button } from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheckCircle } from '@fortawesome/free-solid-svg-icons'; 

const Cocina = () => {
    const [ordenes, setOrdenes] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

    // Obtener órdenes con estado "Preparando" desde el backend
    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                const response = await axios.get("http://localhost:3001/orden/ordenes-preparando");
                setOrdenes(response.data.ordenes);
            } catch (error) {
                console.error("Error al cargar órdenes:", error);
            }
        };

        // Llama a la función al cargar el componente
        fetchOrdenes();

        // Establece un intervalo para actualizar las órdenes cada 5 segundos
        const intervalId = setInterval(() => {
            fetchOrdenes();
        }, 5000); // 5000 ms = 5 segundos

        // Limpieza del intervalo al desmontar el componente
        return () => clearInterval(intervalId);
    }, []); // Dependencias vacías para que se ejecute una sola vez al montar

    const marcarComoListo = (id) => {
        setOrdenes(ordenes.filter(orden => orden.ordenId !== id));
    };

    const handleClose = () => {
        setModalShow(false);
        setOrdenSeleccionada(null);
    };

    return (
        <div className="container cocina-container">
            <h1 className="text-center my-4">Cocina</h1>
            <div className="row">
                <div className="col-md-12">
                    <h2>Órdenes Activas</h2>
                    <div className="row">
                        {ordenes.map((orden) => (
                            <div key={orden.ordenId} className="col-md-4 col-sm-6 mb-4"> {/* Aumentar el tamaño de la columna para responsividad */}
                                <div className="orden-card card h-100 custom-card">
                                    <div className="card-body">
                                        <div className="orden-header d-flex justify-content-between align-items-center">
                                            <p className="card-title small">Mesa: {orden.mesaId}</p>
                                            <span className="estado badge bg-warning">Preparando</span>
                                        </div>
                                        <h3 className="card-subtitle mb-2 small">Usuario: {orden.usuarioId}</h3>
                                        <h5 className="card-number">Orden No: {orden.ordenId}</h5>
                                        <p>Tiempo en preparación: {orden.tiempoPreparacion} segundos</p> {/* Mostrar tiempo en preparación */}
                                        <table className="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Platillo</th>
                                                    <th>Cantidad</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orden.items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.nombre}</td>
                                                        <td>{item.cantidad}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="orden-footer d-flex justify-content-between align-items-center">
                                            <p className="small"><FontAwesomeIcon icon={faClock} /> Tiempo estimado</p>
                                            <button 
                                                className="btn btn-success btn-sm" 
                                                onClick={() => marcarComoListo(orden.ordenId)}
                                            >
                                                <FontAwesomeIcon icon={faCheckCircle} /> Marcar como Listo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal show={modalShow} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles de la Orden</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {ordenSeleccionada && (
                        <div>
                            <h4>Mesa: {ordenSeleccionada.mesaId}</h4>
                            <p>Usuario: {ordenSeleccionada.usuarioId}</p>
                            <p>Tiempo en preparación: {ordenSeleccionada.tiempoPreparacion} segundos</p> {/* Mostrar tiempo en preparación */}
                            <h5>Items:</h5>
                            <ul>
                                {ordenSeleccionada.items.map((item, index) => (
                                    <li key={index}>{item.nombre} - Cantidad: {item.cantidad}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Cocina;
