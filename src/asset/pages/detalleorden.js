import "../style/empleado.css";
import React, { useState, useEffect } from 'react';
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

function DetalleOrden() {
    const [ordenId, setOrdenId] = useState(""); // Para el ID de la orden
    const [platilloId, setPlatilloId] = useState(""); // Para el ID del platillo
    const [cantidad, setCantidad] = useState(""); // Para la cantidad
    const [detalleOrdenLista, setDetalleOrdenLista] = useState([]);
    const [editarDetalle, setEditarDetalle] = useState(false);
    const [ordenes, setOrdenes] = useState([]); // Para las órdenes
    const [platillos, setPlatillos] = useState([]); // Para los platillos

    // Obtener detalles de la orden al montar el componente
    useEffect(() => {
        obtenerDetallesOrden();
        obtenerOrdenes();
        obtenerPlatillos();
    }, []);

    const obtenerDetallesOrden = async () => {
        try {
            const response = await fetch('http://localhost:3001/detalle_orden/listar');
            const data = await response.json();
            setDetalleOrdenLista(data);
        } catch (error) {
            console.error('Error al obtener los detalles de la orden:', error);
        }
    };

    const obtenerOrdenes = async () => {
        try {
            const response = await fetch('http://localhost:3001/orden/listar'); // Ajusta la URL según tu backend
            const data = await response.json();
            setOrdenes(data);
        } catch (error) {
            console.error('Error al obtener las órdenes:', error);
        }
    };

    const obtenerPlatillos = async () => {
        try {
            const response = await fetch('http://localhost:3001/platillos/listar'); // Ajusta la URL según tu backend
            const data = await response.json();
            setPlatillos(data);
        } catch (error) {
            console.error('Error al obtener los platillos:', error);
        }
    };

    const agregarDetalleOrden = () => {
        Axios.post("http://localhost:3001/detalle_orden/guardar", {
            orden_id: ordenId,
            platillo_id: platilloId,
            cantidad: cantidad,
        }).then(() => {
            obtenerDetallesOrden();
            limpiarCampos();
            Swal.fire({
                title: "<strong>Registro exitoso!!!</strong>",
                html: `<i><strong>Detalle de orden</strong> fue registrado con éxito</i>`,
                icon: "success",
                timer: 3000,
            });
        })
        .catch((error) => {
            console.error("Error al registrar el detalle de orden:", error.response ? error.response.data : error.message);
            Swal.fire({
                title: "<strong>Error al registrar</strong>",
                html: `<i>${(error.response?.data?.message || "Ocurrió un error inesperado.")}</i>`,
                icon: "error",
                timer: 3000,
            });
        });
    };

    const actualizarDetalleOrden = () => {
        Axios.put("http://localhost:3001/detalle_orden/actualizar", {
            orden_id: ordenId,
            platillo_id: platilloId,
            cantidad: cantidad,
        }).then(() => {
            obtenerDetallesOrden();
            limpiarCampos();
            Swal.fire({
                title: "<strong>Actualización exitosa!!!</strong>",
                html: `<i><strong>Detalle de orden</strong> fue actualizado con éxito</i>`,
                icon: "success",
                timer: 2500,
            });
        }).catch(error => {
            console.error("Error al actualizar el detalle de orden:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudo actualizar el detalle de orden.",
                icon: "error",
            });
        });
    };

    const limpiarCampos = () => {
        setOrdenId("");
        setPlatilloId("");
        setCantidad("");
        setEditarDetalle(false);
    };

    const editarDetalleOrden = (val) => {
        setEditarDetalle(true);
        setOrdenId(val.orden_id);
        setPlatilloId(val.platillo_id);
        setCantidad(val.cantidad);
    };

    return (
        <div className="container">
            <div className="card text-center">
                <div className="card-header">FORMULARIO DETALLE DE ORDEN</div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            ID Orden:{" "}
                        </span>
                        <select
                            className="form-control"
                            value={ordenId}
                            onChange={(event) => setOrdenId(event.target.value)}
                        >
                            <option value="">Seleccione una orden</option>
                            {ordenes.map((orden) => (
                                <option key={orden.id} value={orden.id}>{orden.id}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            ID Platillo:{" "}
                        </span>
                        <select
                            className="form-control"
                            value={platilloId}
                            onChange={(event) => setPlatilloId(event.target.value)}
                        >
                            <option value="">Seleccione un platillo</option>
                            {platillos.map((platillo) => (
                                <option key={platillo.id} value={platillo.id}>{platillo.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Cantidad:{" "}
                        </span>
                        <input
                            type="number"
                            onChange={(event) => {
                                setCantidad(event.target.value);
                            }}
                            className="form-control"
                            value={cantidad}
                        />
                    </div>
                </div>
                <div className="card-footer text-muted">
                    {editarDetalle ? (
                        <div>
                            <button className="btn btn-warning m-2" onClick={actualizarDetalleOrden}>
                                Actualizar Detalle
                            </button>
                            <button className="btn btn-info m-2" onClick={limpiarCampos}>
                                Cancelar
                            </button>
                        </div>
                    ) : (
                        <button className="btn btn-success" onClick={agregarDetalleOrden}>
                            Registrar Detalle
                        </button>
                    )}
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID Orden</th>
                        <th scope="col">ID Platillo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {detalleOrdenLista.map((val, key) => (
                        <tr key={val.orden_id}>
                            <th>{val.orden_id}</th>
                            <td>{val.orden_id}</td>
                            <td>{val.platillo_id}</td>
                            <td>{val.cantidad}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => {
                                        editarDetalleOrden(val);
                                    }}
                                    className="btn btn-info"
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Aquí deberías agregar la lógica para eliminar el detalle de la orden
                                    }}
                                    className="btn btn-danger"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DetalleOrden;
