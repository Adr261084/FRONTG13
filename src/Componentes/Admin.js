import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import crud from "../Conexiones/crud";
import swal from "sweetalert";

const Admin = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {
            localStorage.removeItem("idCategoria");
            const token = localStorage.getItem('token');
            //console.log(token);
            if (!token) {
                navigate('/login');
            }
        }
        autenticarUsuario();
    }, [navigate]); //indica que se ejecuta una sola vez con []

    const [categoria, setCategorias] = useState([]);

    const cargarCategorias = async () => {
        const response = await crud.GET(`/api/categoria`);
        //console.log(response);
        setCategorias(response.categoria);
    }

    useEffect(() => {
        cargarCategorias();
        localStorage.removeItem('nombreX');
    }, [])

    const eliminarCategoria = async (id) => {
        const response = await crud.DELETE(`/api/categoria/${id}`);
        if (!response) {
            const mensaje = "Error eliminando.";
            swal({
                title: 'error', text: mensaje, icon: 'error', buttons: {
                    confirm: {
                        text: 'Ok', value: true, visible: true, className: 'btn btn-danger', closeModal: true
                    }
                }
            });
        } else {
            let mensaje = "Categoria ha sido eliminada";
            swal({
                title: 'Información', text: mensaje, icon: 'success', buttons: {
                    confirm: {
                        text: 'Ok', value: true, visible: true, className: 'btn btn-primary', closeModal: true
                    }
                }
            });
            cargarCategorias();
        }

    };
    const actualizarCategoria = async (id, nombre) => {

        localStorage.setItem('idCategoria', id);
        localStorage.setItem('nombreX', nombre);
        navigate("/actualizar-categoria");

    };

    return (<>
        <Header/>
        <div className="md:flex md:min-h-screen">
            <Sidebar/>
            <div>
                <table className="table table-bordered "
                       style={{borderColor: "blue", borderBlockWidth: 2, tableLayout: "-moz-initial"}}>
                    <thead className="bg-amber-50">
                    <tr>
                        <th className="border border-orange-300 border-2 px-5 py-1">Nombre</th>
                        <th className="border border-orange-300 border-2 px-5 py-1" colSpan="3">Opciones</th>
                    </tr>
                    </thead>

                    <tbody className="bg-gray-50">
                    {categoria.map(item =>
                        <tr key={item._id}>
                            <td className="border border-orange-300 border-2 px-5 py-1">{item.nombre}</td>
                            <td className="border border-orange-300 border-2 px-5 py-1">
                                <Link className="bg-green-600 rounded-lg px-2 ">Crear Producto</Link>
                            </td>
                            <td className="border border-orange-300 border-2 px-5 py-1">
                                <button className="bg-blue-600 rounded-lg px-2 "
                                        onClick={() => actualizarCategoria(`${item._id}`,`${item.nombre}`)}>Editar
                                </button>
                        </td>
                            <td className="border border-orange-300 border-2 px-5 py-1">
                                <button className="bg-red-600 rounded-lg px-2 "
                                        onClick={() => eliminarCategoria(`${item._id}`)}>Eliminar
                                </button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </>);
}

export default Admin;

