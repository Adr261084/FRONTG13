import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import crud from "../../Conexiones/crud";
import swal from "sweetalert";
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
        nombreCat: '', imagenCat: ''
    });

    const nombreCat = categoria.nombreCat;
    const imagenCat = categoria.imagenCat;


    const cargarProductos = async () => {
        const response = await crud.GET(`/api/producto/${idCategoria}`);
        setProductos(response.producto);
    }

    useEffect(() => {
        cargarProductos();
    }, [])

    const cargarCategoria = async () => {
        const response = await crud.GET(`/api/categoria/${idCategoria}`);
        setCategoria({nombreCat: response.nombre, imagenCat: response.imagen});
    }

    useEffect(() => {
        cargarCategoria();
    }, [])

    const eliminarProducto = (id) => {
        swal({
            title: "Esta seguro de eliminar el producto?",
            text: "Una vez eliminado no podrá recuperarlo",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const response = await crud.DELETE(`/api/producto/${id}`);
                if (response) {
                    cargarProductos();
                    swal("El producto ha sido eliminado", {
                        icon: "success",
                    });
                } else {
                    swal("Hubo un error durante la eliminación");
                }
            } else {
                swal("Has cancelado el proceso de eliminación");
            }
        });
    };

    const actualizarProducto = async (id) => {
        navigate(`/actualizar-producto/${id}`);
    };

    const crearProducto = async (id) => {
        navigate(`/crear-producto/${id}`);
    };

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

                <table className="table table-bordered "
                       style={{borderColor: "blue", borderBlockWidth: 2, tableLayout: "-moz-initial"}}>
                    <thead className="bg-amber-50">
                    <tr>
                        <th className="border border-orange-300 border-2 px-5 py-1">Nombre Producto</th>
                        <th className="border border-orange-300 border-2 px-5 py-1">Imagen Producto</th>
                        <th className="border border-orange-300 border-2 px-5 py-1">Descripcion</th>
                        <th className="border border-orange-300 border-2 px-5 py-1">Cantidad existente</th>
                        <th className="border border-orange-300 border-2 px-5 py-1">Precio unitario</th>
                        <th className="border border-orange-300 border-2 px-5 py-1" colSpan="2">Opciones disponibles
                        </th>
                    </tr>
                    </thead>

                    <tbody className="bg-gray-50">
                    {productos.map(item => <tr key={item._id}>
                        <td className="border border-orange-300 border-2 px-5 py-1">{item.nombre}</td>
                        <td className="border border-orange-300 border-2 px-5 py-1">
                            <img src={item.imagen} alt="no-resource" width="200" height="200"></img>
                        </td>
                        <td className="border border-orange-300 border-2 px-5 py-1">{item.descripcion}</td>
                        <td className="border border-orange-300 border-2 px-5 py-1">{item.stock}</td>
                        <td className="border border-orange-300 border-2 px-5 py-1">{item.precio}</td>
                        <td className="border border-orange-300 border-2 px-5 py-1">
                            <button className="bg-blue-600 rounded-lg px-2 "
                                    onClick={() => actualizarProducto(`${item._id}`)}>
                                Editar<br/>Producto
                            </button>
                        </td>
                        <td className="border border-orange-300 border-2 px-5 py-1">
                            <button className="bg-red-600 rounded-lg px-2 "
                                    onClick={() => eliminarProducto(`${item._id}`)}>
                                Eliminar<br/>Producto
                            </button>
                        </td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </>);
}

export default HomeProductos;

