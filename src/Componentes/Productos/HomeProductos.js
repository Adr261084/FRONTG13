import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import crud from "../../Conexiones/crud";
import ViewProductos from "./ViewProductos";

const HomeProductos = () => {


    const navigate = useNavigate();
    const {idCategoria} = useParams();

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
            }
        }
        autenticarUsuario();
    }, []);

    const [productos, setProductos] = useState([]);

    const [categoria, setCategoria] = useState({
        nombreCat: '',
        imagenCat: ''
    });

    const nombreCat = categoria.nombreCat;
    const imagenCat = categoria.imagenCat;


    const cargarProductos = async () => {
        const response = await crud.GET(`/api/producto/${idCategoria}`);
        setProductos(response.producto);
    }

    useEffect(() => {
        cargarProductos();
    }, [localStorage.getItem("cont") || 0])

    const cargarCategoria = async () => {
        const response = await crud.GET(`/api/categoria/${idCategoria}`);
        setCategoria({nombreCat: response.nombre, imagenCat: response.imagen});
    }

    useEffect(() => {
        cargarCategoria();
    }, [])

    return (<>
        <Header/>
        <div className="md:flex md:min-h-screen">
            <Sidebar/>
            <div>
                <div className="mt-10 flex justify-center">
                    <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200
                        bg-clip-text
                        font-display text-3xl tracking-tight text-transparent justify-center">
                        {nombreCat} <br/>
                        <img src={imagenCat} alt="no-resource" width="200" height="200"/>
                    </h1>
                </div>
                <div className="p-5">
                    <Link
                        to={`/crear-producto/${idCategoria}`}
                        className="bg-violet-600 mb-5 w-full p-3 text-white
                            uppercase font-bold rounded hover:cursor-pointer
                            hover:bg-violet-400 transition-colors">
                        Nuevo Producto
                    </Link>
                    <span className="px-10"/>
                    <Link
                        to={"/admin"}
                        className="bg-violet-600 mb-5 w-full p-3 text-white
                            uppercase font-bold rounded hover:cursor-pointer
                            hover:bg-violet-400 transition-colors">
                        Regresar
                    </Link>
                </div>
                <div className="bg-gray-600 shadow mt-10 rounded-lg">
                    {
                        productos.map(item =>
                            <ViewProductos
                                key={item._id}
                                producto={item}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    </>);
}

export default HomeProductos;

