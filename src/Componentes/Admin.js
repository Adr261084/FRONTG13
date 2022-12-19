import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import crud from "../Conexiones/crud";
import swal from "sweetalert";

const Admin = () => {

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

    const [categoria, setCategorias] = useState([]);

    const cargarCategorias = async () => {
        const response = await crud.GET(`/api/categoria`);
        setCategorias(response.categoria);
    }

    useEffect(() => {
        cargarCategorias();
    }, [])

    const eliminarCategoria = (id) => {
        swal({
            title: "Esta seguro de eliminar la categoria?",
            text: "Una vez eliminada no podrá recuperarla",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {

                const existe = await crud.GET(`/api/producto/homeFiltro/${id}`);
                console.log(existe.producto.length);
                if (existe.producto.length === 0) {


                    const response = await crud.DELETE(`/api/categoria/${id}`);
                    if (response) {
                        cargarCategorias();
                        swal("La categoría ha sido eliminada", {
                            icon: "success",
                        });
                    } else {
                        swal("Hubo un error durante la eliminación");
                    }
                } else {
                    swal("Hay productos relacionados, no se permite la eliminación");
                }
            } else {
                swal("Has cancelado el proceso de eliminación");
            }
        });
    };
    const actualizarCategoria = async (id) => {
        navigate(`/actualizar-categoria/${id}`);
    };

    const trabajarConProductos = async (id) => {
        localStorage.setItem("cont", 0);
        navigate(`/home-productos/${id}`);
    };

    return (<>
        <Header/>
        <div className="md:flex md:min-h-screen">
            <Sidebar/>
            <div>
                <table >
                    <thead className="bg-blue-100">
                    <tr>
                        <th className="px-5 py-1">Nombre Categoria</th>
                        <th className="px-5 py-1">Imagen Categoria</th>
                        <th className="px-5 py-1" colSpan="3">Opciones disponibles
                        </th>
                    </tr>
                    </thead>

                    <tbody className="bg-blue-100">
                    {categoria.map(item =>
                        <tr key={item._id}>
                            <td className="border border-gray-100 border-2 px-5 py-1 font-extrabold text-center">
                                {item.nombre}
                            </td>
                            <td className="border border-gray-100 border-2 px-5 py-1">
                                <img src={item.imagen} alt="no-resource" width="200" height="200"></img>
                            </td>
                            <td className="border border-gray-100 border-2 px-5 py-1">
                                <button className="bg-blue-600 rounded-lg px-2 hover:bg-blue-400"
                                        onClick={() => actualizarCategoria(`${item._id}`)}>
                                    Editar<br/>Categoria
                                </button>
                            </td>
                            <td className="border border-gray-100 border-2 px-5 py-1">
                                <button className="bg-red-600 rounded-lg px-2 hover:bg-red-400"
                                        onClick={() => eliminarCategoria(`${item._id}`)}>
                                    Eliminar<br/>Categoria
                                </button>
                            </td>
                            <td className="border border-gray-100 border-2 px-5 py-1">
                                <button className="bg-green-600 rounded-lg px-2 hover:bg-green-400"
                                        onClick={() => trabajarConProductos(`${item._id}`)}>
                                    Trabajar con <br/> productos
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

