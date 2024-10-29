import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/mesero.css"; // Archivo CSS con los nuevos nombres de clases

const Mesero = () => {
    const [categorias, setCategorias] = useState([]);
    const [platillos, setPlatillos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [pedido, setPedido] = useState([]); // Estado para el pedido

    useEffect(() => {
        obtenerCategorias();
    }, []);

    const obtenerCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:3001/categoria/listar');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al obtener categorías', error);
        }
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

    const handleCategoriaClick = (categoriaId) => {
        setCategoriaSeleccionada(categoriaId);
        obtenerPlatillos(categoriaId);
    };

    const agregarPlatillo = (platillo) => {
        setPedido(prevPedido => {
            const existe = prevPedido.find(item => item.id === platillo.id);
            if (existe) {
                return prevPedido.map(item =>
                    item.id === platillo.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prevPedido, { ...platillo, cantidad: 1 }];
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

    return (
        <div className="nuevo-container">
            <h1>Menú de Platillos</h1>
            <div className="nueva-categorias">
                {categorias.map((categoria) => (
                    <button
                        key={categoria.id}
                        className={nueva-categoria-btn ${categoriaSeleccionada === categoria.id ? 'active' : ''}}
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
                        <p key={item.id}>{item.nombre} - {item.cantidad} x Q{item.precio}</p>
                    ))}
                </div>
                <p className="nuevo-total">
                    Total: Q{pedido.reduce((total, item) => total + parseFloat(item.precio) * item.cantidad, 0).toFixed(2)}
                </p>
                <button className="nuevo-finalizar-btn">Finalizar Pedido</button>
            </div>
        </div>
    );
};

export default Mesero;