import React, {useEffect, useLayoutEffect, useState} from "react";
import {Link} from "react-router-dom";
import crud from "../Conexiones/crud";

const Home = () => {

    const [listaProductos, setListaProductos] = useState(
        [
            {
                nombre: "",
                precio: 0,
                stock: 0,
                imagen: ""
            }
        ]);

    let {nombre, precio, stock, imagen} = listaProductos;

    function rellenar1(){
        try {
            nombre = listaProductos.nombre;
            console.log("listaProductos");
            console.log(listaProductos);
            this.forceUpdate();
        } catch (e) {

        }
    };

    async function listarProductos() {
        const response = await crud.GET(`/api/producto`).then(rellenar1());
        console.log("Procesando");
        console.log(response);
        return response;
    }

    useLayoutEffect(() => {
        try {
            setListaProductos(listarProductos());
        } catch (error) {
            console.log("Hubo error")
        }
    }, []);

    return (
        <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
            <div className='md:w-2/3 lg:w-2/5'>
                <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                    G13 Pantalla Home 1
                </h1>
                <Link
                    to={"/login"}
                    className="block text-center my-5 text-violet-600 uppercase text-sm"
                >Iniciar sesión</Link>
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    Nombre
                </label>
                <label type="nombre"
                       id="nombre" name="nombre" value={nombre}
                       className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                />
            </div>
        </main>
    );
}

export default Home;

