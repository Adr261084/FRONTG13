import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Componentes/Login";
import CrearCuenta from "./Componentes/CrearCuenta";
import Admin from "./Componentes/Admin";
import Home from "./Componentes/Home";
import CrearCategoria from "./Componentes/Categorias/CrearCategoria";
import ActualizarCategoria from "./Componentes/Categorias/ActualizarCategoria";
import CrearProducto from "./Componentes/Productos/CrearProducto";
import HomeProductos from "./Componentes/Productos/HomeProductos";
import ActualizarProducto from "./Componentes/Productos/ActualizarProducto";
import CarritoCompras from "./Componentes/Pedidos/CarritoCompras";
import ListarPedidos from "./Componentes/Pedidos/ListarPedidos";

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
                        <Route path="/actualizar-categoria/:idCategoria" exact element={<ActualizarCategoria/>}/>
                        <Route path="/home-productos/:idCategoria" exact element={<HomeProductos/>}/>
                        <Route path="/crear-producto/:idCategoria" exact element={<CrearProducto/>}/>
                        <Route path="/actualizar-producto/:idProducto" exact element={<ActualizarProducto/>}/>
                        <Route path="/registrar-compra/:idProducto" exact element={<CarritoCompras/>}/>
                        <Route path="/lista-pedidos" exact element={<ListarPedidos/>}/>

                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;