import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../style/mesero.css";

const Mesero = () => {
    const [categorias, setCategorias] = useState([]);
    const [platillos, setPlatillos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [pedido, setPedido] = useState([]);
    const [mesas, setMesas] = useState([]);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
    const [fechaActual, setFechaActual] = useState('');
    const [idUsuario, setIdUsuario] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [ordenGenerada, setOrdenGenerada] = useState(false); 
    const [mostrarSeccionOrden, setMostrarSeccionOrden] = useState(true); 
    const [ordenId, setOrdenId] = useState(null); // Para almacenar el ID de la orden generada

    useEffect(() => {
        obtenerCategorias();
        obtenerMesas();
        obtenerFechaActual();
        const usuario = localStorage.getItem('idUsuario'); 
        setIdUsuario(usuario);
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:3001/obteneruser');
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    const obtenerCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:3001/categoria/listar');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al obtener categorías', error);
        }
    };

    const obtenerMesas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/mesas/listar');
            setMesas(response.data);
        } catch (error) {
            console.error('Error al obtener mesas', error);
        }
    };

    const obtenerFechaActual = () => {
        const fecha = new Date();
        const opcionesFormato = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        setFechaActual(fecha.toLocaleString('es-ES', opcionesFormato));
    };

    const handleCategoriaClick = (categoriaId) => {
        setCategoriaSeleccionada(categoriaId);
        obtenerPlatillos(categoriaId);
    };

    const obtenerPlatillos = async (categoriaId) => {
        try {
            const response = await axios.get('http://localhost:3001/platillos/listar');
            const platillosFiltrados = response.data.filter(platillo => platillo.categoria_id === categoriaId);
            setPlatillos(platillosFiltrados);
        } catch (error) {
            console.error('Error al obtener platillos', error);
        }
    };

    const agregarPlatillo = (platillo) => {
        setPedido(prevPedido => {
            const existe = prevPedido.find(item => item.id === platillo.id);
            if (existe) {
                return prevPedido.map(item =>
                    item.id === platillo.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prevPedido, { ...platillo, cantidad: 1, confirmado: false }];
        });
    };

    const quitarPlatillo = (platillo) => {
        setPedido(prevPedido => {
            return prevPedido.reduce((acc, item) => {
                if (item.id === platillo.id) {
                    if (item.cantidad > 1) {
                        return [...acc, { ...item, cantidad: item.cantidad - 1 }];
                    }
                    return acc;
                }
                return [...acc, item];
            }, []);
        });
    };


    
    

    const handleMesaChange = (e) => {
        setMesaSeleccionada(e.target.value);
    };

    const addOrden = async () => {
        const total = pedido.reduce((total, item) => total + parseFloat(item.precio) * item.cantidad, 0).toFixed(2);
        
        try {
            const response = await axios.post("http://localhost:3001/orden/guardar", {
                id_usuario: idUsuario,
                mesa_id: mesaSeleccionada,
                fecha_orden: fechaActual,
                total: total,
            });
            
            // Obtén el ordenId de la respuesta de manera segura
            const nuevoOrdenId = response.data?.ordenId;
            
            if (nuevoOrdenId) {
                setOrdenId(nuevoOrdenId);
                console.log("Orden ID generada:", nuevoOrdenId);
    
                // Limpia campos y muestra confirmación
                limpiarCampos(); 
                Swal.fire({
                    title: "<strong>Orden registrada!</strong>",
                    html: "<i>Orden guardada exitosamente</i>",
                    icon: "success",
                    timer: 3000,
                });
                setOrdenGenerada(true);
                setMostrarSeccionOrden(false);
            } else {
                console.error("No se recibió un ordenId válido en la respuesta.");
                Swal.fire({
                    title: "Error",
                    text: "No se recibió un ID de orden válido.",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error("Error al registrar la orden:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudo registrar la orden.",
                icon: "error",
            });
        }
    };
    
    
    
    
    const confirmarPlatillo = async (platilloId) => {
        // Buscar el platillo en el pedido
        const platillo = pedido.find(item => item.id === platilloId);
        console.log("Orden ID actual:", ordenId); // Para depuración
    
        // Verificar si hay un ordenId generado
        if (!ordenId) {
            Swal.fire({
                title: "Error",
                text: "Debes generar una orden antes de confirmar un platillo.",
                icon: "error",
            });
            return; // Salir si no hay ordenId
        }
    
        // Proceder solo si se encontró el platillo
        if (platillo) {
            try {
                // Hacer la solicitud para guardar el detalle de la orden
                const response = await axios.post("http://localhost:3001/detalle_orden/guardar", {
                    orden_id: ordenId,
                    platillo_id: platilloId,
                    cantidad: platillo.cantidad,
                });
    
                // Comprobar la respuesta del servidor
                if (response.status === 201) {
                    // Marcar el platillo como confirmado
                    setPedido(prevPedido =>
                        prevPedido.map(item =>
                            item.id === platilloId ? { ...item, confirmado: true } : item
                        )
                    );
    
                    Swal.fire({
                        title: "<strong>Platillo confirmado!</strong>",
                        html: `<i>${platillo.nombre} ha sido confirmado.</i>`,
                        icon: "success",
                        timer: 3000,
                    });
                }
            } catch (error) {
                console.error("Error al confirmar platillo:", error);
                Swal.fire({
                    title: "<strong>Error al confirmar</strong>",
                    html: `<i>${error.message}</i>`,
                    icon: "error",
                    timer: 3000,
                });
            }
        } else {
            // Manejar el caso en que el platillo no se encuentra
            Swal.fire({
                title: "Error",
                text: "Platillo no encontrado.",
                icon: "error",
            });
        }
    };
    


    
    

    const limpiarCampos = () => {
        setPedido([]);
        setMesaSeleccionada(null);
        setCategoriaSeleccionada(null);
        setPlatillos([]);
    };

    const handleContinuar = () => {
        Swal.fire({
            title: "<strong>Pedido finalizado!</strong>",
            html: "<i>El pedido se ha completado exitosamente</i>",
            icon: "success",
            timer: 3000,
        });
        limpiarCampos();
        setMostrarSeccionOrden(true); // Muestra la sección de Generar Orden después de finalizar el pedido
        setOrdenGenerada(false); // Oculta el menú de platillos
    };

 
    return (
        <div className="nuevo-container">
            {mostrarSeccionOrden && (
                <div className="header-informacion">
                    <h1 className="titulo-generar-orden">Generar Orden</h1>
                    <div className="info-frame">
                        <select value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)}>
                            <option value="">Seleccione un usuario</option>
                            {usuarios.map((usuario) => (
                                <option key={usuario.id} value={usuario.id}>
                                    {usuario.id_usuario}
                                </option>
                            ))}
                        </select>
                        <p>Fecha y Hora: {fechaActual}</p>
                        <div className="mesa-seleccion">
                            <label htmlFor="mesa">Seleccionar Mesa:</label>
                            <select id="mesa" value={mesaSeleccionada} onChange={handleMesaChange}>
                                <option value="">-- Selecciona una mesa --</option>
                                {mesas.map((mesa) => (
                                    <option key={mesa.id} value={mesa.id}>
                                        Mesa {mesa.numero}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <br />
                        <button className="continuar-btn" onClick={addOrden}>Generar Orden</button>
                    </div>
                </div>
            )}

            {ordenGenerada && (
                <>
                    <h1>Menú de Platillos</h1>
                    <div className="nueva-categorias">
                        {categorias.map((categoria) => (
                            <button
                                key={categoria.id}
                                className={`nueva-categoria-btn ${categoriaSeleccionada === categoria.id ? 'activo' : ''}`}
                                onClick={() => handleCategoriaClick(categoria.id)}
                            >
                                {categoria.nombre}
                            </button>
                        ))}
                    </div>

                    <div className="nuevo-menu">
            {platillos.map((platillo) => (
                <div key={platillo.id} className="nuevo-platillo">
                    <p>
                        <img src={platillo.imagen} alt={platillo.nombre} style={{ width: '100px', height: 'auto' }} />
                    </p>
                    <p>{platillo.nombre}</p>
                    <p>Precio: {platillo.precio}</p>
                    <div className="cantidad-control">
                        <button 
                            className="menos-btn" 
                            onClick={() => quitarPlatillo(platillo)}
                            disabled={!pedido.some(item => item.id === platillo.id)}
                        >
                            -
                        </button>
                        <span>
                            {pedido.find(item => item.id === platillo.id)?.cantidad || 0}
                        </span>
                        <button 
                            className="mas-btn" 
                            onClick={() => agregarPlatillo(platillo)}
                        >
                            +
                        </button>
                    </div>
                </div>
            ))}
        </div>

                    <div className="nuevo-resumen resumen-naranja">
                        <h2>Resumen del Pedido</h2>
                        <div id="items-pedido">
    {pedido.map((item) => (
        <div key={item.id} className="resumen-platillo">
            <p>{item.nombre} - {item.cantidad} x Q{item.precio}</p>
            <button
                onClick={() => confirmarPlatillo(item.id)}
                className={`check-btn ${item.confirmado ? 'confirmado' : ''}`}
                disabled={item.confirmado}  // Desactiva el botón si el platillo está confirmado
            >
                {item.confirmado ? '✔️' : '✓'}
            </button>
        </div>
    ))}
</div>
                        <p className="nuevo-total">
                Total: Q{pedido.reduce((total, item) => total + parseFloat(item.precio) * item.cantidad, 0).toFixed(2)}
                        </p>
                        <button onClick={handleContinuar} className="nuevo-finalizar-btn">Confirmar Pedido</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Mesero;
