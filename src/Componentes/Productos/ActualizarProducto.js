import React, {useEffect, useState} from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import crud from "../../Conexiones/crud";
import {Link, useNavigate, useParams} from "react-router-dom";
import swal from "sweetalert";


const ActualizarProducto = () => {

    const navigate = useNavigate();
    const {idProducto} = useParams();

    console.log("idProducto actualizarProducto", idProducto);
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        stock: '',
        descripcion: '',
        imagen: '',
        categoriaId: ''
    });

    const cargarProducto = async () => {
        try {
            const response = await crud.GET(`/api/producto/id/${idProducto}`);
            console.log(response, "Desde cargarProducto actualizacion")
            setProducto(response.producto);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        cargarProducto();
    }, []);

    const {nombre, imagen, stock, precio, descripcion} = producto;

    const onChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    }

    const actualizarProducto = async () => {

        const data = {
            imagen: producto.imagen,
            nombre: producto.nombre,
            stock: producto.stock,
            precio: producto.precio,
            categoriaId: producto.categoriaId,
            descripcion: producto.descripcion
        }
        console.log(data);
        const response = await crud.PUT(`/api/producto/${idProducto}`, data);
        console.log(response.msg || "ok");

        const mensaje = "Producto ha sido actualizado";
        swal({
            title: 'Información',
            text: mensaje,
            icon: 'success',
            buttons: {
                confirm: {
                    text: 'Ok',
                    value: true,
                    visible: true,
                    className: 'btn btn-primary',
                    closeModal: true
                }
            }
        });
        navigate("/admin");
    }

    const onSubmit = (e) => {
        e.preventDefault();
        actualizarProducto();
    }

    return (
        <>
            <Header/>
            <div className="md:flex md:min-h-screen">
                <Sidebar/>
                <main className="flex-1">
                    <div className="mt-10 flex justify-center">
                        <h1 className="inline bg-gradient-to-r
                        from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text
                        font-display text-5xl tracking-tight text-transparent">
                            Actualizar Producto
                        </h1>
                        <div className="mt-10 flex justify-center">
                            <form
                                onSubmit={onSubmit}
                                className="my-10 bg-white shadow-orange-500 rounded-lg p-10">

                                <label className="uppercase text-gray-600 block text-xl font-bold">
                                    Nombre
                                </label>

                                <input type="text"
                                       placeholder="Nuevo nombre producto"
                                       id="nombre"
                                       name="nombre"
                                       value={nombre}
                                       onChange={onChange}
                                       className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                       required/>

                                <label className="uppercase text-gray-600 block text-xl font-bold">
                                    Imagen
                                </label>

                                <input type="text"
                                       placeholder="Nueva imagen producto"
                                       id="imagen"
                                       name="imagen"
                                       value={imagen}
                                       onChange={onChange}
                                       className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                       required/>

                                <label className="uppercase text-gray-600 block text-xl font-bold">
                                    Descripción
                                </label>

                                <input type="text"
                                       placeholder="Nueva descripción producto"
                                       id="descripcion"
                                       name="descripcion"
                                       value={descripcion}
                                       onChange={onChange}
                                       className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                       required/>

                                <label className="uppercase text-gray-600 block text-xl font-bold">
                                    Existencias
                                </label>

                                <input type="number"
                                       placeholder="Nuevo stock producto"
                                       id="stock"
                                       name="stock"
                                       value={stock}
                                       onChange={onChange}
                                       className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                       required/>

                                <label className="uppercase text-gray-600 block text-xl font-bold">
                                    precio
                                </label>

                                <input type="number"
                                       placeholder="Nuevo precio producto"
                                       id="precio"
                                       name="precio"
                                       value={precio}
                                       onChange={onChange}
                                       className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                       required/>

                                <input
                                    type="submit"
                                    value="Actualizar"
                                    className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold
                                    rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"/>
                            </form>
                            <Link
                                to={"/admin"}
                                className="block text-center my-5 text-violet-600 uppercase text-sm">
                                Regresar
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default ActualizarProducto;