import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import crud from "../../Conexiones/crud";
import swal from "sweetalert";

const CarritoCompras = () => {
    const {idProducto} = useParams();
    const navigate = useNavigate();

    const [producto, setProducto] = useState({
        nombre: "", descripcion: "", precio: "", stock: "", imagen: ""
    });
    const [compra, setCompra] = useState({
        nombreComprador: "", emailComprador: "", direccionComprador: "", telefono: "", unidades: ""
    });

    const {nombre, descripcion, precio, stock, imagen} = producto;

    const {nombreComprador, emailComprador, direccionComprador, telefono, unidades} = compra;


    const obtenerProducto = async (idProd) => {
        const response = await crud.GET(`/api/producto/producto/${idProd}`);
        setProducto(response.producto);
    }

    useEffect(() => {
        obtenerProducto(idProducto);
    }, [])

    function cancelarPedido() {
        navigate("/");
    }

    const realizarPedido = async (evento) => {
        evento.preventDefault();
        if (producto.stock < compra.unidades) {
            const mensaje = "stock insuficiente para su pedido";
            swal({
                title: 'error', text: mensaje, icon: 'error', buttons: {
                    confirm: {
                        text: 'Ok', value: true, visible: true, className: 'btn btn-danger', closeModal: true
                    }
                }
            });
        } else if (compra.unidades <= 0) {
            const mensaje = "Debe seleccionar o digitar unidades validas";
            swal({
                title: 'error', text: mensaje, icon: 'error', buttons: {
                    confirm: {
                        text: 'Ok', value: true, visible: true, className: 'btn btn-danger', closeModal: true
                    }
                }
            });
        }
        else {
            var totalPedido = producto.precio * compra.unidades;
            const data = {
                nombreComprador: compra.nombreComprador,
                emailComprador: compra.emailComprador,
                telefono: compra.telefono,
                direccionComprador: compra.direccionComprador,
                unidades: compra.unidades,
                totalPedido: totalPedido,
                idProducto: idProducto
            }
            const response = await crud.POST(`/api/pedido`, data);
            console.log(response, "resspuesta CRUD");
            if (!response) {
                const mensaje = "Se ha presentado un error, revise consola";
                swal({
                    title: 'error', text: mensaje, icon: 'error', buttons: {
                        confirm: {
                            text: 'Ok', value: true, visible: true, className: 'btn btn-danger', closeModal: true
                        }
                    }
                });
            } else {
                const mensaje = "Pedido ha sido realizado";
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
                var nuevasUnidades = producto.stock - compra.unidades;
                const data = {
                    stock: nuevasUnidades
                }
                const response = await crud.PUT(`/api/producto/pedido/${idProducto}`, data);
                console.log(response, data, "restarUnidades");
                navigate("/");
            }
        }
    }

    const onChange = (evento) => {
        setCompra({
            ...compra, [evento.target.name]: evento.target.value
        });
    };
    return (<>
        <h2 className="text-indigo-900 bg-gray-50 text-5xl text-center p-8">Ingresar información del pedido</h2>
        <div className="md:flex md:min-h-screen">
        <div className="border-r flex bg-gradient-to-r from-black to-gray-400 p-5 rounded-lg md:justify-between items-center">

            <img src={imagen} alt="no-resource" width="200" height={200}/>
            <div className="flex, flex-col, items-start p-3 rounded-lg border-2 border-gray-300 bg-gray-800">

                <p className="mb-1 text-xl text-gray-50 font-bold">
                    {nombre}
                </p>
                <p className="mb-1 text-xl text-gray-50 ">
                    Descripción: {descripcion}
                </p>
                <p className="mb-1 text-xl text-gray-50">
                    Existencia: {stock} unidades
                </p>
                <p className="mb-1 text-xl text-gray-50">
                    Precio : ${precio}.00
                </p>
            </div>
            <br/>
        </div>
            <main className="flex-1">
                <h1 className="bg-gradient-to-r
                        from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text
                        font-display text-5xl tracking-tight text-transparent text-center p-5">
                    Datos del pedido </h1>
                <div className="mt-1 flex justify-center">
                    <div className="mt-1 flex justify-center">
                        <form onSubmit={realizarPedido}
                              className="my-1 bg-white shadow-orange-500 rounded-lg p-10">

                            <label className="uppercase text-gray-600 block text-xl font-bold">
                                Nombre
                            </label>

                            <input type="text"
                                   placeholder="Nombre del comprador"
                                   id="nombreComprador"
                                   name="nombreComprador"
                                   value={nombreComprador}
                                   onChange={onChange}
                                   className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                   required/>
                            <label className="uppercase text-gray-600 block text-xl font-bold">
                                Email
                            </label>

                            <input type="email"
                                   placeholder="email del comprador"
                                   id="emailComprador"
                                   name="emailComprador"
                                   value={emailComprador}
                                   onChange={onChange}
                                   className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                   required/>

                            <label className="uppercase text-gray-600 block text-xl font-bold">
                                Dirección de entrega
                            </label>

                            <input type="text"
                                   placeholder="direccion de entrega, incluya la ciudad"
                                   id="direccionComprador"
                                   name="direccionComprador"
                                   value={direccionComprador}
                                   onChange={onChange}
                                   className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                   required/>

                            <label className="uppercase text-gray-600 block text-xl font-bold">
                                Teléfono de contacto
                            </label>

                            <input type="tel"
                                   placeholder="Teléfono de contaco"
                                   id="telefono"
                                   name="telefono"
                                   value={telefono}
                                   onChange={onChange}
                                   className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                   required/>

                            <label className="uppercase text-gray-600 block text-xl font-bold">
                                Cantidad de unidades
                            </label>

                            <input type="number"
                                   placeholder="Unidades a comprar"
                                   id="unidades"
                                   name="unidades"
                                   value={unidades}
                                   onChange={onChange}
                                   className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                   required/>


                            <input
                                type="submit"
                                value="Realizar compra"
                                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                            />
                            <Link
                                to={`/`}
                                className="block text-center my-5 text-violet-600 uppercase text-sm"
                            >Cancelar</Link>

                        </form>
                    </div>
                </div>
            </main>
        </div>
    </>)
}

export default CarritoCompras;
