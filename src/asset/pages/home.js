import React from 'react';

const home = () => {
  return (
    <div className="container mt-4">
      {/* Bienvenida */}
      <div className="jumbotron p-4 mb-4 bg-light rounded">
        <h1 className="display-4">¡Bienvenido al Sistema de Gestión del Restaurante!</h1>
        <p className="lead">
          Aquí puedes gestionar las órdenes, ver el estado del inventario, y controlar la operación diaria del restaurante.
        </p>
        <hr className="my-4" />
        <p>
          Utiliza el menú de la izquierda para navegar entre las diferentes secciones del sistema.
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Órdenes de hoy</h5>
              <p className="card-text display-4">120</p>
              <p className="text-muted">Órdenes procesadas hoy</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Clientes activos</h5>
              <p className="card-text display-4">45</p>
              <p className="text-muted">Clientes en el restaurante</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Inventario</h5>
              <p className="card-text display-4">85%</p>
              <p className="text-muted">Inventario disponible</p>
            </div>
          </div>
        </div>
      </div>

      {/* Últimas órdenes */}
      <div className="card mt-4">
        <div className="card-header">
          Últimas órdenes procesadas
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Orden #123 - Mesa 5 - Estado: Completada</li>
          <li className="list-group-item">Orden #124 - Mesa 8 - Estado: En Proceso</li>
          <li className="list-group-item">Orden #125 - Para llevar - Estado: En preparación</li>
          <li className="list-group-item">Orden #126 - Mesa 2 - Estado: Completada</li>
        </ul>
      </div>
    </div>
  );
  };

export default home;
