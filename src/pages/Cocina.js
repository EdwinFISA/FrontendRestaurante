import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/cocina.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Modal, Button } from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheckCircle } from '@fortawesome/free-solid-svg-icons'; 

const Cocina = () => {
    // Agregamos dos órdenes estáticas para la vista previa
    const [ordenes, setOrdenes] = useState([
        {
            ordenId: 1,
            mesaId: 5,
            usuarioId: 'Carlos',
            tiempoPreparacion: 120,
            items: [
                { nombre: 'Tacos', cantidad: 2 },
                { nombre: 'Ensalada', cantidad: 1 }
            ]
        },
        {
            ordenId: 2,
            mesaId: 3,
            usuarioId: 'Ana',
            tiempoPreparacion: 300,
            items: [
                { nombre: 'Pizza', cantidad: 1 },
                { nombre: 'Soda', cantidad: 3 }
            ]
        }
    ]);
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

        fetchOrdenes();

        const intervalId = setInterval(() => {
            fetchOrdenes();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const marcarComoListo = (id) => {
        setOrdenes(ordenes.filter(orden => orden.ordenId !== id));
    };

    const handleClose = () => {
        setModalShow(false);
        setOrdenSeleccionada(null);
    };

    return (
        <div className="container-fluid cocina-container">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center my-4">Órdenes Activas</h2>
                    <div className="row">
                        {ordenes.map((orden) => (
                            <div key={orden.ordenId} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                <div className="orden-card card h-100 custom-card">
                                    <div className="card-body">
                                        <div className="orden-header d-flex justify-content-between align-items-center">
                                            <p className="card-title small">Usuario: {orden.usuarioId} - Mesa: {orden.mesaId}</p>
                                        </div>
                                        <h5 className="card-number text-center mb-3">Orden No: {orden.ordenId}</h5>
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
                                        <Button 
                                            className="btn btn-success btn-block w-100"
                                            onClick={() => marcarComoListo(orden.ordenId)}
                                        >
                                            <FontAwesomeIcon icon={faCheckCircle} /> Marcar como Listo
                                        </Button>
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
