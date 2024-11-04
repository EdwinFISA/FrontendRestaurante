import React, { useState } from 'react';
import '../style/Historial.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const orders = [
  {
    mesa: 'Mesa 5',
    mesero: 'Ana',
    items: ['2x Pasta', '1x Tiramisu'],
    tiempoPreparacion: '20 minutos',
    fechaCompletada: '3/11/2024, 20:10:39'
  },
  {
    mesa: 'Mesa 8',
    mesero: 'Luis',
    items: ['3x Sushi', '1x Sake'],
    tiempoPreparacion: '25 minutos',
    fechaCompletada: '3/11/2024, 19:15:39'
  }
];

const Historial = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  return (
    <div className="historial-container">
      <h1>Historial de Órdenes</h1>
      <div className="header">
        <input type="text" placeholder="Buscar órdenes..." className="search-bar" />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="date-picker"
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="order-list">
        <table>
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Mesero</th>
              <th>Items</th>
              <th>Tiempo de Preparación</th>
              <th>Fecha Completada</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.mesa}</td>
                <td>{order.mesero}</td>
                <td>
                  {order.items.map((item, i) => (
                    <div key={i}>{item}</div>
                  ))}
                </td>
                <td>{order.tiempoPreparacion}</td>
                <td>{order.fechaCompletada}</td>
                <td>
                  <button onClick={() => openModal(order)} className="details-button">Ver Detalles</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Detalles de la Orden</h2>
            <p><strong>Mesa:</strong> {selectedOrder.mesa}</p>
            <p><strong>Mesero:</strong> {selectedOrder.mesero}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p><strong>Tiempo de Preparación:</strong> {selectedOrder.tiempoPreparacion}</p>
            <p><strong>Fecha Completada:</strong> {selectedOrder.fechaCompletada}</p>
            <button className="close-button" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Historial;
