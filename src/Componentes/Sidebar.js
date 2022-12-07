import React from "react";
import {Link} from "react-router-dom";

const Sidebar = () => {

    return (
        <aside className="md:w-60 lg:w-90 px-5 py-10 bg-gray-500">
            <p className="text-xl font-bold">Administrador</p>
            <Link
                to={"/crear-categoria"}
                className="bg-violet-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
            >Crear Categoria</Link>
        </aside>
    );
}

export default Sidebar;