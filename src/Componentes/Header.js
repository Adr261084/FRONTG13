import React from "react";
import {useNavigate} from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();
    const cerrarCesion = () => {
        localStorage.removeItem('token');
        navigate("/");
    }

    return (
        <header className="px-4 py-5 bg-gradient-to-r from-black via-gray-400 to-black border-b ">
            <div className="md:flex md:justify-between ">
                <h2 className="text-4xl text-violet-600 font-bold text-center mb-5 md:mb-0">
                    G13 - Panel de Administradores
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-4 p-4">
                    <input
                        type="submit"
                        value="Cerrar Sesión"
                        onClick={cerrarCesion}
                        className="bg-violet-600 mb-5 w-full py-3 text-white
                            uppercase font-bold rounded hover:cursor-pointer
                            hover:bg-violet-400 transition-colors p-2"
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;