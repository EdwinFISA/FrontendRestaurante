import React, { useState } from 'react';
import '../style/cocina.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Modal, Button } from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheckCircle } from '@fortawesome/free-solid-svg-icons'; 

const Cocina = () => {
    const [ordenes, setOrdenes] = useState([
        {
            id: 2,
            numeroOrden: 2,
            mesa: 'Mesa 12',
            mesero: 'Manuel',
            items: [
                { nombre: 'Pizza', cantidad: 1 },
                { nombre: 'Camarones', cantidad: 3 }
            ],
            tiempoEstimado: '5 min',
        },
        {
            id: 3,
            numeroOrden: 3,
            mesa: 'Mesa 5',
            mesero: 'Luis',
            items: [
                { nombre: 'Ensalada', cantidad: 1 },
                { nombre: 'Agua', cantidad: 2 }
            ],
            tiempoEstimado: '8 min',
        },
        {
            id: 4,
            numeroOrden: 4,
            mesa: 'Mesa 3',
            mesero: 'Laura',
            items: [
                { nombre: 'Tacos', cantidad: 4 }
            ],
            tiempoEstimado: '12 min',
        },
        {
            id: 5,
            numeroOrden: 5,
            mesa: 'Mesa 8',
            mesero: 'Carlos',
            items: [
                { nombre: 'Sopa', cantidad: 2 },
                { nombre: 'Pan', cantidad: 1 }
            ],
            tiempoEstimado: '6 min',
        }
    ]);

    const [modalShow, setModalShow] = useState(false);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

    const marcarComoListo = (id) => {
        setOrdenes(ordenes.filter(orden => orden.id !== id));
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
                            <div key={orden.id} className="col-md-3 col-sm-6 mb-4"> {/* Mantener 4 tarjetas en cada fila */}
                                <div className="orden-card card h-100 custom-card"> {/* Clase personalizada para el tamaño */}
                                    <div className="card-body">
                                        <div className="orden-header d-flex justify-content-between align-items-center">
                                            <p className="card-title small">Mesero: {orden.mesero}</p>
                                            <span className="estado badge bg-warning">Preparando</span>
                                        </div>
                                        <h3 className="card-subtitle mb-2 small">{orden.mesa}</h3>
                                        <h5 className="card-number">Orden No: {orden.numeroOrden}</h5>
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
                                            <p className="small"><FontAwesomeIcon icon={faClock} /> {orden.tiempoEstimado}</p>
                                            <button 
                                                className="btn btn-success btn-sm" 
                                                onClick={() => marcarComoListo(orden.id)}
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
                            <h4>{ordenSeleccionada.mesa}</h4>
                            <p>Mesero: {ordenSeleccionada.mesero}</p>
                            <p>Tiempo Estimado: {ordenSeleccionada.tiempoEstimado}</p>
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
