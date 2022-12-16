import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";
import crud from "../../Conexiones/crud";

const ViewProductos = (props) => {

    const navigate = useNavigate();

    const [productos, setProductos] = useState([]);

    const {imagen, nombre, stock, precio, descripcion} = props.producto;
    const idCategoria = props.producto.categoriaId;
    const idProducto = props.producto._id;

    const actualizarProducto = async (id) => {
        navigate(`/actualizar-producto/${id}`);
    };

    const cargarProductos = async () => {
        const response = await crud.GET(`/api/producto/${idCategoria}`);
        setProductos(response.producto);
    }

    useEffect(() => {
        cargarProductos();
    }, [])


    const eliminarProducto = (id) => {
        swal({
            title: "Esta seguro de eliminar el producto?",
            text: "Una vez eliminado no podrá recuperarlo",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const response = await crud.DELETE(`/api/producto/${id}`);
                if (response) {
                    cargarProductos();
                    swal("El producto ha sido eliminado", {
                        icon: "success",
                    });
                } else {
                    swal("Hubo un error durante la eliminación");
                }
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
                        {nombre}
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