import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";


const Admin = () => {

    const navigate = useNavigate();

    useEffect(() => {
       const autenticarUsuario = async () => {
           const token = localStorage.getItem('token');
           //console.log(token);
           if (!token){
               navigate('/login');
           }
       }
       autenticarUsuario();
    }, [navigate]); //indica que se ejecuta una sola vez con []

    const cerrarCesion = () => {
        localStorage.removeItem('token');
        navigate("/");
    }

    return (
        <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
            <div className='md:w-2/3 lg:w-2/5'>
                <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                    G13 Panel de Administrador
                </h1>
                <input
                    type="submit"
                    value="Cerrar Sesión"
                    onClick={cerrarCesion}
                    className="bg-violet-600 mb-5 w-full py-3 text-white
                            uppercase font-bold rounded hover:cursor-pointer
                            hover:bg-violet-400 transition-colors"
                />
            </div>

        </main>
    );
}

export default Admin;

