import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import crud from "../Conexiones/crud";


const Home = () => {

    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);

    const cargarCategorias = async () => {
        const response = await crud.GET(`/api/categoria/home`)
        setCategorias(response.categoria)
    }

    const [productos, setProductos] = useState([]);

    const cargarProductos = async (idCategoria) => {
        if (idCategoria !== "") {
            const response = await crud.GET(`/api/producto/homeFiltro/${idCategoria}`);
            setProductos(response.producto);

        } else {
            const response = await crud.GET(`/api/producto/home`);
            setProductos(response.producto);
        }
    }

    function seleccionarCategoria(idCat) {
        var filtro = idCat || "";
        console.log(filtro, "cambioCategoriaFiltro")
        localStorage.setItem("filtro", filtro);
        cargarProductos(filtro);
    }

    function agregarAlCarrito(idProducto) {
        navigate(`/registrar-compra/${idProducto}`);
    }

    useEffect(() => {
        cargarCategorias();
        localStorage.setItem("filtro", "");
    }, []);

    useEffect(() => {
        cargarProductos(localStorage.getItem("filtro") || "");
    }, [localStorage.getItem("filtro") || ""]);


    return (
        <main className='flex-1'>
            <div className="md:flex md:justify-between p-8 ">
                <h2 className="text-4xl text-violet-400 font-bold text-center mb-5 md:mb-0">
                    Proyecto G13 - Grupo 4
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-4 p-4">
                    <Link
                        to={"/login"}
                        className="bg-violet-600 mb-5 w-full py-3 text-white
                            uppercase font-bold rounded hover:cursor-pointer
                            hover:bg-violet-400 transition-colors p-2"
                    >Inicio de Sesión</Link>
                </div>
            </div>
            <div>
                <div className="md:justify-center flex p-5 bg-gradient-to-r from-gray-700 via-gray-200 to-gray-700">
                    <label
                        className="inline bg-gradient-to-r from-indigo-800 via-blue-700 to-indigo-800 bg-clip-text
                        font-display text-5xl tracking-tight text-transparent">
                        Lista productos
                    </label>
                </div>
                <div className="py-5 sm:py-4 xl:mx-auto xl:max-w-7xl xl:px-5 rounded-lg border-b-amber-600 border-2 ">
                    <div className="px-4 sm:flex sm:items-start sm:justify-between sm:px-6 lg:px-8 xl:px-0 align-top">
                        <div className="mt-4 flow-root ">
                            <div className="-my-2 bg-white rounded-lg p-1">
                                <h2 className="text-2xl bg-blue-100 font-bold tracking-tight text-gray-900 rounded-lg text-center ">
                                    Filtro por categoria
                                </h2>
                                <div className="relative box-content overflow-x-auto py-2 xl:overflow-visible">
                                    <div
                                        className="flex justify-center w-auto border-spacing-2 border-2
                                        border-amber-800 rounded-lg opacity-50 hover:opacity-100
                                        align-top">
                                        <div className="flex-row">
                                            <input type="submit"
                                                   onClick={() => seleccionarCategoria("")}
                                                   value="Todas"
                                                   className="text-xl font-bold text-blue-900 shadow-neutral-700 block"/>
                                            <input type="image"
                                                   width="140"
                                                   src="https://res.cloudinary.com/dn0qmcint/image/upload/v1671241651/22-leyes-inmutables-marketing-ley-cateegoria-francisco-torreblanca_ha052y.png"
                                                   alt="No-Image"
                                                   onClick={() => seleccionarCategoria("")}
                                            />
                                        </div>
                                    </div>
                                    {categorias.map((category) => (
                                        <div className="p-1 " key={category._id}>
                                            <div

                                                className="flex w-auto border-spacing-2 border-2 border-amber-800 rounded-lg opacity-50 hover:opacity-100">

                                                <div className="flex-row rounded-lg border-b-amber-600 border-2">
                                                    <input type="submit"
                                                           onClick={() => seleccionarCategoria(category._id)}
                                                           value={category.nombre}
                                                           className="text-xl font-bold text-blue-900 shadow-neutral-700 block"/>
                                                    <input type="image"
                                                           width="140"
                                                           src={category.imagen}
                                                           alt="No-Image"
                                                           onClick={() => seleccionarCategoria(category._id)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                                <div
                                    className="bg-gray-200 mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8
                                    rounded-lg border-b-blue-600 border-2">
                                    {productos.map((product) => (
                                        <div key={product._id}>
                                            <div
                                                className="relative rounded-lg border-amber-600 border-2 bg-white hover:bg-amber-500">
                                                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                                    <img
                                                        src={product.imagen}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="relative mt-4">
                                                    <label
                                                        className="font-extrabold text-blue-900 shadow-gray-50 ">{product.nombre}</label>
                                                </div>
                                                <div
                                                    className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                                    <div
                                                        aria-hidden="true"
                                                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                                    />
                                                    <p className="relative text-lg font-semibold text-white">$ {product.precio}.00</p>
                                                </div>
                                                {(() => {
                                                    if (product.stock > 0) {
                                                        return (
                                                            <div className="mt-6 p-2">
                                                                <button
                                                                    onClick={() => agregarAlCarrito(product._id)}
                                                                    className="relative flex items-center justify-center bg-blue-200 py-3 px-3 text-sm font-medium text-gray-900 hover:bg-blue-800 hover:text-white rounded-lg"
                                                                >
                                                                    Agregar al carrito<span
                                                                    className="sr-only">, {product.nombre}</span>
                                                                </button>
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div className="mt-6 p-2">
                                                                <button
                                                                    className="relative flex items-center justify-center bg-blue-200 py-3 px-3 text-sm
                                                                    font-medium text-gray-900 hover:bg-gray-200 hover:text-red-800 hover:font-bold rounded-lg"
                                                                >
                                                                    No hay stock disponible<span
                                                                    className="sr-only">, {product.nombre}</span>
                                                                </button>
                                                            </div>
                                                        )
                                                    }
                                                })()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
        ;
}

export default Home;

