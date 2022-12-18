import React, {useEffect, useState} from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import crud from "../../Conexiones/crud";
import swal from "sweetalert";
import {Link, useNavigate, useParams} from "react-router-dom";

const CrearProducto = () => {

    const navigate = useNavigate();
    const {idCategoria} = useParams();

    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        stock: '',
        precio: '',
        imagen: '',
        categoriaId: ''
    });
    const [categoria, setCategoria] = useState({
        nombreCat: '',
        imagenCat: ''
    });

    const {nombre, descripcion, stock, precio, imagen} = producto;

    const nombreCat = categoria.nombreCat;
    const imagenCat = categoria.imagenCat;

    const onChange = (evento) => {
        setProducto({
            ...producto, [evento.target.name]: evento.target.value
        });
    }

    const cargarCategoria = async () => {
        const response = await crud.GET(`/api/categoria/${idCategoria}`);

        setCategoria({nombreCat: response.nombre, imagenCat: response.imagen});
    }

    useEffect(() => {
        cargarCategoria();
    }, [])

    const crearProducto = async () => {

        const data = {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            stock: producto.stock,
            precio: producto.precio,
            imagen: producto.imagen,
            categoriaId: idCategoria
        }

        const response = await crud.POST(`/api/producto`, data);
        console.log(response.msg || "ok");

        const mensaje = "ViewProductos ha sido creado";
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

        var contador = localStorage.getItem("cont") || 1;
        contador ++;
        localStorage.setItem("cont", contador);
        navigate(`/home-productos/${idCategoria}`);
    }

    const onSubmit = (evento) => {
        evento.preventDefault();
        crearProducto();
    }

    return (<>
            <Header/>
            <div className="md:flex md:min-h-screen">
                <Sidebar/>
                <main className="flex-1">
                    <div className="mt-10 flex justify-center">
                        <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200
                        bg-clip-text
                        font-display text-5xl tracking-tight text-transparent">
                            Formulario Crear producto
                        </h1>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200
                        bg-clip-text
                        font-display text-3xl tracking-tight text-transparent justify-center">
                            {nombreCat} <br/>
                            <img src={imagenCat} alt="no-resource" width="200" height="200"/>
                        </h1>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <form
                            onSubmit={onSubmit}
                            className="my-10 bg-white shadow-orange-500 rounded-lg p-10"
                        >
                            <div className="my-5">
                                <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                                <input type="text" placeholder="Ingrese nombre"
                                       id="nombre"
                                       name="nombre"
                                       value={nombre}
                                       onChange={onChange}
                                       className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                       required
                                />
                                <label className="uppercase text-gray-600 block text-xl font-bold">Descripción</label>
                                <input type="text" placeholder="Descripción del producto"
                                       id="descripcion"
                                       name="descripcion"
                                       value={descripcion}
                                       onChange={onChange}
                                       className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                       required
                                />
                                <label className="uppercase text-gray-600 block text-xl font-bold">Cantidad</label>
                                <input type="number" placeholder="Ingrese cantidad del producto"
                                       id="stock"
                                       name="stock"
                                       value={stock}
                                       onChange={onChange}
                                       className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                       required
                                />
                                <label className="uppercase text-gray-600 block text-xl font-bold">Precio
                                    unitario</label>
                                <input type="number" placeholder="Ingrese precio por unidad"
                                       id="precio"
                                       name="precio"
                                       value={precio}
                                       onChange={onChange}
                                       className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                       required
                                />
                                <label className="uppercase text-gray-600 block text-xl font-bold">Imágen</label>
                                <input type="text" placeholder="Ingrese nombre"
                                       id="imagen"
                                       name="imagen"
                                       value={imagen}
                                       onChange={onChange}
                                       className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                       required
                                />
                                <input
                                    type="submit"
                                    value="Crear Producto"
                                    className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                                />
                                <Link
                                    to={`/home-productos/${idCategoria}`}
                                    className="block text-center my-5 text-violet-600 uppercase text-sm"
                                >Regresar</Link>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}

export default CrearProducto;