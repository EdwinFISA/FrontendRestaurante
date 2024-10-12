import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 
import Swal from 'sweetalert2'; 

function Logout() {
    const { logout } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
        const confirmLogout = async () => {
            const result = await Swal.fire({
                title: '¿Estás seguro de que quieres salir?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, salir',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                logout(); 
                navigate('/login'); 
            } else {
                navigate(-1); 
            }
        };

        confirmLogout(); 
    }, [logout, navigate]);

    return null; 
}

export default Logout;
