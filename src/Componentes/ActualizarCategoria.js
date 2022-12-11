import React, {useEffect, useState} from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {Link, useNavigate} from "react-router-dom";
import crud from "../Conexiones/crud";
import swal from "sweetalert";

const ActualizarCategoria = () => {

    const navigate = useNavigate();

    const idRecibido = localStorage.getItem("idCategoria");

    const [categoria, setCategoria] = useState({
        nombre: ''
    });

    const {nombre} = categoria;

    const cargarCategoria = async () => {
        try {
            const response = await crud.GET(`/api/categoria/${idRecibido}`);
            localStorage.setItem('nombreX', response.nombre);
        } catch (e){
            console.log(e);
        }
    }

    const onChange = (e) => {
        setCategoria({
            ...categoria, [e.target.name]: e.target.value
        });
    }
    const onChangeX = (e) => {
        //No hace ni mu
    }

    const actualizarCategoria = async () => {
        const data = {
            nombre: categoria.nombre
        }
        const response = await crud.PUT(`/api/categoria/${idRecibido}`, data);
        console.log(response.msg || "ok");

        const mensaje = "Categoria ha sido actualizada";
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

        setCategoria({
            nombre: ""
        });
        localStorage.removeItem('nombreX');
        navigate("/admin");
    }

    const onSubmit = (e) => {
        e.preventDefault();
        actualizarCategoria();
    }
    useEffect (() => {
        cargarCategoria();
    }, [1]);


    return (
        <>
            <Header/>
            <div className="md:flex md:min-h-screen">
                <Sidebar/>
                <main className="flex-1">
                    <div className="mt-10 flex justify-center">
                        <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200
                        bg-clip-text
                        font-display text-5xl tracking-tight text-transparent">
                            Actualizar Categoria
                        </h1>
                        <div className="mt-10 flex justify-center">
                            <form
                                onSubmit={onSubmit}
                                className="my-10 bg-white shadow-orange-500 rounded-lg p-10"
                            >
                                <div className="my-5">
                                    <label className="uppercase text-gray-600 block text-xl font-bold">Id Categoria
                                    </label>
                                    <input type="text"
                                           placeholder={idRecibido}
                                           id="id"
                                           name="id"
                                           value={idRecibido}
                                           onChange={onChangeX}
                                           className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                           required
                                    />
                                    <label className="uppercase text-gray-600 block text-xl font-bold">Nombre
                                    </label>
                                    <input type="text" placeholder={localStorage.getItem('nombreX') || 'no cargada'}
                                           id="nombre"
                                           name="nombre"
                                           value={nombre}
                                           onChange={onChange}
                                           className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                           required
                                    />
                                    <input
                                        type="submit"
                                        value="Actualizar"
                                        className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                                    />
                                    <Link
                                        to={"/admin"}
                                        className="block text-center my-5 text-violet-600 uppercase text-sm"
                                    >Regresar</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default ActualizarCategoria;