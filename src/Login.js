// Login.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { usePermission } from 'react-permission-role';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Accede a la función de login del contexto
    const { setUser } = usePermission(); // Accede a la función para establecer el usuario

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Submitting login with:', { username, password });
        axios.post('http://localhost:3001/login', { username, password })
            .then(res => {
                console.log('Login response:', res);
                if (res.status === 200 && res.data.token) {
                    console.log('Login successful, token received');
                    // Store the token in localStorage
                    localStorage.setItem('token', res.data.token);
                    // Set the default Authorization header for future requests
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                    login(res.data.user);

                      // Establecer roles y permisos en el contexto de permisos
                      setUser({
                        id: res.data.user.id,
                        roles: res.data.user.roles || [], // Asegúrate de que esto sea un array
                        permissions: res.data.user.permissions || [] // Asegúrate de que esto sea un array
                    });
                    console.log("Roles:", res.data.user.roles);
                  
                    console.log("Permissions:", res.data.user.permissions);

                    console.log('Navigating to /home');
                    navigate('/home');
                    
                } else {
                    console.log('Login failed:', res.data);
                    setError('Usuario o contraseña incorrectos');
                }
            })
            .catch(err => {
                console.error('Login error:', err.response ? err.response.data : err.message);
                setError('Error al iniciar sesión, por favor intenta de nuevo');
            });
    }
return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
        <div className='p-3 bg-white w-25'>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="username">Usuario</label>
                    <input type="text" placeholder='Ingrese su usuario' className='form-control'
                        onChange={e => setUsername(e.target.value)} />
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
