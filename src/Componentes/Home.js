import React from "react";
import {Link} from "react-router-dom";

const Home = () => {

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

            </div>

        </main>
    );
}

export default Home;

