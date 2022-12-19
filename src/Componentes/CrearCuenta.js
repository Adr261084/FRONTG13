import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import swal from "sweetalert";
import crud from "../Conexiones/crud";

const CrearCuenta = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const {nombre, email, password, confirmar} = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    const crearCuenta = async () => {
        if (password !== confirmar) {
            console.log("Password no coincide");
            const mensaje = "Password no coincide.";
            swal({
                title: 'error',
                text: mensaje,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        } else {
            const data = {
                nombre: usuario.nombre,
                email: usuario.email,
                password: usuario.password
            }
            console.log(data);
            const response = await crud.POST(`/api/usuarios`, data);
            const mensaje = response.msg;
            if (mensaje === 'El usuario ya existe') {
                const mensaje = "El usuario ya existe";
                swal({
                    title: 'error',
                    text: mensaje,
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
            } else {
                const mensaje = "El usuario fu creado correctamente";
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
                setUsuario({
                    nombre: "",
                    email: "",
                    password: "",
                    confirmar: ""
                });
                //Redireccionar a la pantalla de login
                navigate("/login");
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearCuenta();
    }

    return (
        <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
            <div className='md:w-2/3 lg:w-2/5'>
                <h1 className="text-center bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                    Crear cuenta Administrador
                </h1>
                <form
                    onSubmit={onSubmit}
                    className="my-10 bg-white shadow-orange-500 rounded-lg p-10"
                >
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Nombre
                        </label>
                        <input type="nombre" placeholder="Ingrese su nombre"
                               id="nombre" name="nombre" value={nombre}
                               onChange={onChange}
                               className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                               required
                        />
                        <br/>
                        <label className="uppercase text-gray-600 block text-xl font-bold">E-Mail
                        </label>
                        <input type="email" placeholder="email de registro"
                               id="email" name="email" value={email} onChange={onChange}
                               className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                               required
                        />
                        <br/>

                        <label className="uppercase text-gray-600 block text-xl font-bold">Password
                        </label>
                        <input type="password" placeholder="password de registro"
                               id="password" name="password" value={password} onChange={onChange}
                               className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                               required
                        />
                        <br/>
                        <label className="uppercase text-gray-600 block text-xl font-bold">Confirmar
                        </label>
                        <input type="password" placeholder="confirme su password"
                               id="confirmar" name="confirmar" value={confirmar} onChange={onChange}
                               className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                               required
                        />
                        <br/>
                        <input
                            type="submit"
                            value="Crear cuenta"
                            className="bg-violet-600 mb-5 w-full py-3 text-white
                            uppercase font-bold rounded hover:cursor-pointer
                            hover:bg-violet-400 transition-colors"
                        />
                        <Link
                            to={"/"}
                            className="block text-center my-5 text-violet-600 uppercase text-sm"
                        >Regresar</Link>
                    </div>
                </form>
            </div>

        </main>
    );
}

export default CrearCuenta;

/*
<center>
    <div>
        <h1>G13</h1>
        <h1>Creación de cuenta</h1>
        <h2>Bienvenido, Ingrese sus datos</h2>
        <form action={"/"}>
            <input type={"text"} placeholder={"Nombre"} required/><br/>
            <input type={"email"} placeholder={"email"} required/><br/>
            <input type={"password"} name={"Password"} placeholder={"contraseña"} required/><br/>
            <input type={"password"} name={"Confirma"} placeholder={"confirma"} required/><br/>
            <input type={"submit"} name={"Crear"} value={"Crear Cuenta"}/><br/>
        </form>
        <Link to={"/"}>Regresar</Link>
    </div>
</center>*/
