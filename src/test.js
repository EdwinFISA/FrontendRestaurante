import './App.css';
import { useState } from 'react';
//instalar axios npm install axios
import Axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [primerNombre, setprimerNombre] = useState("");
  const [segundoNombre, setsegundoNombre] = useState("");
  const [primerApellido, setprimerApellido] = useState("");
  const [segundoApellido, setsegundoApellido] = useState("");
  const [telefono, settelefono] = useState(0);
  //const [direccion, setdireccion] = useState("");
  const [email, setemail] = useState("");

  const [personalist,setEmpelados] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      primer_nombre:primerNombre,
      segundo_nombre:segundoNombre,
      primer_apellido:primerApellido,
      segundo_apellido:segundoApellido,
      telefono:telefono,
     // direccion:direccion
      email:email
    }).then(()=>{
      getPersona();
      alert("Persona Registrado");
    });
  }

  const getPersona = () => {
    Axios.get("http://localhost:3001/personas").then((response)=>{
      setEmpelados(response.data);
    });
  }

  getPersona();

  return (
    <div className="container">
   {/*Aqui va la pagina web o el login */}
            <div className="card text-center">
      <div className="card-header">
      FORMULARIO DE PERSONAS
      </div>
    <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Primer nombre: </span>
          <input type="text" onChange={(event)=>{setprimerNombre(event.target.value);}} 
          className="form-control" placeholder="Ingrese su Primer Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Segundo Nombre: </span>
          <input type="text" onChange={(event)=>{setsegundoNombre(event.target.value);}} 
          className="form-control" placeholder="Ingrese su Segundo Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Primer Apellido: </span>
          <input type="text" onChange={(event)=>{setprimerApellido(event.target.value);}}
          className="form-control" placeholder="Ingrese su Primer Apellido" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Segundo Apellido: </span>
          <input type="text" onChange={(event)=>{setsegundoApellido(event.target.value);}}
          className="form-control" placeholder="Ingrese su Segundo Apellido" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"> Telefono: </span>
          <input type="number" onChange={(event)=>{settelefono(event.target.value);}}
          className="form-control" placeholder="Ingrese su telefono" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Email: </span>
          <input type="email" onChange={(event)=>{setemail(event.target.value);}}
          className="form-control" placeholder="Ingrese su email" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
    </div>
      <div className="card-footer text-muted">
      <button className='btn btn-success' onClick={add}>Registrar persona</button>
      </div>
    </div>
    <table className="table table-striped">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Primer Nombre</th>
        <th scope="col">Segundo Nombre</th>
        <th scope="col">Primer Apellido</th>
        <th scope="col">Segundo Apellido</th>
        <th scope="col">Telefono</th>
        <th scope="col">Email</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
        {
          personalist.map((val, key)=>{
            return <tr key={val.id}>
              <th>{val.id}</th>
              <td>{val.primerNombre}</td>
              <td>{val.segundoNombre}</td>
              <td>{val.primerApellido}</td>
              <td>{val.segundoApellido}</td>
              <td>{val.telefono}</td>
              <td>{val.email}</td>
            </tr>
            
          })
        }

    </tbody>
  </table>

  </div>
  );
}

export default App;
