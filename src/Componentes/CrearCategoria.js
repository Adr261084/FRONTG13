import React, {useState} from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {Link, useNavigate} from "react-router-dom";
import crud from "../Conexiones/crud";
import swal from "sweetalert";

const CrearCategoria = () => {

    const navigate = useNavigate();

    const [categoria, setCategoria] = useState({
        nombre: '',
        imagen: ''
    });

    const {nombre, imagen} = categoria;

    const onChange = (e) => {
        setCategoria({
            ...categoria, [e.target.name]: e.target.value
        });
    }

    const crearCategoria = async () => {
        const data = {
            nombre: categoria.nombre,
            imagen: categoria.imagen
        }
        const response = await crud.POST(`/api/categoria`, data);
        console.log(response.msg || "ok");

        const mensaje = "Categoria ha sido creada";
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
            nombre: "",
            imagen: ""
        });
        navigate("/admin");
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearCategoria();
    }

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
                            Crear Categoria
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
                                <label className="uppercase text-gray-600 block text-xl font-bold">Imagen</label>
                                <input type="text" placeholder="Ingrese imagen de categoria"
                                       id="imagen"
                                       name="imagen"
                                       value={imagen}
                                       onChange={onChange}
                                       className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                                       required
                                />
                                <input
                                    type="submit"
                                    value="Crear categoria"
                                    className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                                />
                                <Link
                                    to={"/admin"}
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

export default CrearCategoria;