import React, {useEffect, useLayoutEffect, useState} from 'react';
import ViewProductos from "../Productos/ViewProductos";
import ViewPedido from "./ViewPedido";
import crud from "../../Conexiones/crud";
import swal from "sweetalert";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {Link, useNavigate} from "react-router-dom";

const ListarPedidos = () => {

    const [pedidos, setPedidos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
            }
        }
        autenticarUsuario();
    }, []);

    const cargarPedidos = async () => {
        const response = await crud.GET(`/api/pedido`);
        setPedidos(response.pedido);
    };

    useEffect(() => {
        cargarPedidos();
    }, [])

    return (
        <>
            <Header/>
            <div className="md:flex md:min-h-screen">
                <Sidebar/>
                <div>
                    <div className="mt-10 flex justify-center">
                        <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200
                        bg-clip-text
                        font-display text-6xl tracking-tight text-transparent justify-center">
                            Lista de pedidos
                        </h1>
                    </div>
                    <div className="p-5">
                        <Link
                            to={"/admin"}
                            className="bg-violet-600 mb-5 w-full p-3 text-white
                            uppercase font-bold rounded hover:cursor-pointer
                            hover:bg-violet-400 transition-colors">
                            Regresar
                        </Link>
                    </div>
                    <div className="bg-gray-600 shadow mt-10 rounded-lg p-5">
                        {pedidos.map(pedido =>
                            <ViewPedido
                                key={pedido._id}
                                pedido={pedido}
                            />
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListarPedidos;