// Login.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Importa el hook del contexto

function Login() {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Accede a la función de login del contexto

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/login', { username, password })
            .then(res => {
                if (res.status === 200 && res.data.success) {

                    login(res.data.userName); // Marks the user as authenticated
                    navigate('/home'); // Redirect to the home page
                } else {
                    setError('Usuario o contraseña incorrectos');
                }
            })
            .catch(err => {
                console.log(err);
                setError('Error al iniciar sesión, por favor intenta de nuevo');
            });
    }
    

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-25'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Usuario</label>
                        <input type="email" placeholder='Ingrese su usuario Email' className='form-control'
                            onChange={e => setusername(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" placeholder='Ingrese su contraseña' className='form-control'
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button className='btn btn-success'>Login</button>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
        </div>
    );
}

export default Login;
