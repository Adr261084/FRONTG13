import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import swal from "sweetalert";
import crud from "../Conexiones/crud";

const Login = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        email: '', password: ''
    });

    const {email, password} = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario, [e.target.name]: e.target.value
        });
    }

    const autenticarUsuario = async () => {
        const data = {
            email: usuario.email, password: usuario.password
        }

        const response = await crud.POST(`/api/auth`, data);
        console.log(response.msg || "ok");
        if (response.msg === "El usuario no existe") {
            const mensaje = "El usuario no existe";
            swal({
                title: 'error', text: mensaje, icon: 'error', buttons: {
                    confirm: {
                        text: 'Ok', value: true, visible: true, className: 'btn btn-danger', closeModal: true
                    }
                }
            });
        } else if (response.msg === "Password incorrecto") {
            const mensaje = "Password incorrecto";
            swal({
                title: 'error', text: mensaje, icon: 'error', buttons: {
                    confirm: {
                        text: 'Ok', value: true, visible: true, className: 'btn btn-danger', closeModal: true
                    }
                }
            });
        } else {
            const jwt = response.token;
            console.log(jwt);
            localStorage.setItem('token', jwt);





            navigate("/admin");
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        autenticarUsuario();
    }

    return (<main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
            <div className='md:w-2/3 lg:w-2/5'>
                <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                    G13 Iniciar sesión Ecommerce
                </h1>
                <form
                    onSubmit={onSubmit}
                    className="my-10 bg-white shadow-orange-500 rounded-lg p-10"
                >
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">E-Mail
                        </label>
                        <input type="email" placeholder="email de registro"
                               id="email" name="email" value={email} onChange={onChange}
                               className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                               required
                        />
                        <br/>
                        <label className="uppercase text-gray-600 block text-xl font-bold">password
                        </label>
                        <input type="password" placeholder="password de registro"
                               id="password" name="password" value={password} onChange={onChange}
                               className="w-full mt-3 p-3 rounded-lg bg-gray-50"
                               required
                        />
                        <br/>
                        <input
                            type="submit"
                            value="Iniciar Sesión"
                            className="bg-violet-600 mb-5 w-full py-3 text-white
                            uppercase font-bold rounded hover:cursor-pointer
                            hover:bg-violet-400 transition-colors"
                        />
                        <Link
                            to={"/crear-cuenta"}
                            className="block text-center my-5 text-violet-600 uppercase text-sm"
                        >Crear Cuenta</Link>
                        <Link
                            to={"/"}
                            className="block text-center my-5 text-violet-600 uppercase text-sm"
                        >Regresar</Link>
                    </div>
                </form>
            </div>

        </main>);
}
export default Login;
