import React from "react";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";
import crud from "../../Conexiones/crud";

const ViewProductos = (props) => {

    const navigate = useNavigate();

    const {imagen, nombre, stock, precio, descripcion} = props.producto;
    const idCategoria = props.producto.categoriaId;
    const idProducto = props.producto._id;

    const actualizarProducto = async (idProd) => {
        navigate(`/actualizar-producto/${idProd}`);
    };

    const eliminarProducto = (idProd) => {
        console.log(idProd);
        console.log(idProducto);
        swal({
            title: "Esta seguro de eliminar el producto?",
            text: "Una vez eliminado no podrá recuperarlo",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const response = await crud.DELETE(`/api/producto/${idProd}`);
                if (response) {
                    swal("El producto ha sido eliminado", {
                        icon: "success",
                    });
                } else {
                    swal("Hubo un error durante la eliminación");
                }
                var contador = localStorage.getItem("cont") || 1;
                contador ++;
                localStorage.setItem("cont", contador);
                navigate(`/home-productos/${idCategoria}`);
            } else {
                swal("Has cancelado el proceso de eliminación");
            }
        });
    };

    return (
        <>
            <div className="border-r flex bg-gray-500 p-5 rounded-lg md:justify-between items-center">

                <img src={imagen} alt="no-resource" width="200" height={200}/>
                <div className="flex, flex-col, items-start p-3">

                    <p className="mb-1 text-xl text-gray-50 font-bold">
                        {nombre} - [{idProducto}]
                    </p>
                    <p className="mb-1 text-xl text-gray-50 ">
                        Descripción: {descripcion}
                    </p>
                    <p className="mb-1 text-xl text-gray-50">
                        Existencia: {stock} unidades
                    </p>
                    <p className="mb-1 text-xl text-gray-50">
                        Precio : ${precio}
                    </p>
                </div>
                <br/>

                <div className="flex flex-col lg:flex-row gap-2">
                    <button className="bg-blue-600 rounded-lg px-2 "
                            onClick={() => actualizarProducto(`${idProducto}`)}>
                        Editar<br/>Producto
                    </button>
                    <button className="bg-red-600 rounded-lg px-2 "
                            onClick={() => eliminarProducto(`${idProducto}`)}>
                        Eliminar<br/>Producto
                    </button>
                </div>

            </div>
        </>
    );
}

export default ViewProductos;