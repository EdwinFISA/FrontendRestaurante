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
        setPedido([...pedido, platillo]); // Agrega el platillo al pedido
    };

    return (
        <div className="nuevo-container">
            <h1>Menú de Platillos</h1>
            <div className="nueva-categorias">
                {categorias.map((categoria) => (
                    <button
                        key={categoria.id}
                        className={`nueva-categoria-btn ${categoriaSeleccionada === categoria.id ? 'active' : ''}`}
                        onClick={() => handleCategoriaClick(categoria.id)}
                    >
                        {categoria.nombre}
                    </button>
                ))}
            </div>
            <div className="nuevo-menu">
                {platillos.map((platillo) => (
                    <div key={platillo.id} className="nuevo-platillo">
                        <p>{platillo.nombre}</p>
                        <p>Precio: {platillo.precio}</p>
                        <button 
                            className="nuevo-agregar-btn" 
                            onClick={() => agregarPlatillo(platillo)}
                        >
                            Agregar al pedido
                        </button>
                    </div>
                ))}
            </div>
            <div className="nuevo-resumen">
                <h2>Resumen del Pedido</h2>
                <div id="items-pedido">
                    {pedido.map((item, index) => (
                        <p key={index}>{item.nombre} - {item.precio}</p>
                    ))}
                </div>
                <p className="nuevo-total">
                    Total: Q{pedido.reduce((total, item) => total + parseFloat(item.precio), 0).toFixed(2)}
                </p>
                <button className="nuevo-finalizar-btn">Finalizar Pedido</button>
            </div>
        </div>
    );
};

export default Mesero;
