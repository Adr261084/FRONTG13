import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Componentes/Login";
import CrearCuenta from "./Componentes/CrearCuenta";
import Admin from "./Componentes/Admin";
import Home from "./Componentes/Home";
import CrearCategoria from "./Componentes/CrearCategoria";
import ActualizarCategoria from "./Componentes/ActualizarCategoria";

function App() {
    return (
        <div className="App">
            <div className="App-header">
                <Router>
                    <Routes>
                        <Route path="/" exact element={<Home/>}/>
                        <Route path="/login" exact element={<Login/>}/>
                        <Route path="/crear-cuenta" exact element={<CrearCuenta/>}/>
                        <Route path="/admin" exact element={<Admin/>}/>
                        <Route path="/crear-categoria" exact element={<CrearCategoria/>}/>
                        <Route path="/actualizar-categoria" exact element={<ActualizarCategoria/>}/>

                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;