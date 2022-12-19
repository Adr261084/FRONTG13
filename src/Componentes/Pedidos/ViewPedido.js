import React, {useEffect, useState} from 'react';
import crud from "../../Conexiones/crud";
import {format, parseISO} from 'date-fns'


const ViewPedido = (props) => {

    const pedido = props.pedido;

    const {nombreComprador, emailComprador, direccionComprador, telefono, unidades, idProducto, totalPedido, fechaPedido} = pedido;

    const [producto, setProducto] = useState({
        nombre:"",
        imagen:""
    })

    const {nombre, imagen} = producto;

    const cargarProducto = async () => {
        const response = await crud.GET(`/api/producto/id/${idProducto}`);
        setProducto(response.producto);
    };

    useEffect(()=>{
        cargarProducto();
    }, [])


    return (
        <>
            <div className="border-r flex bg-gray-500 p-5 rounded-lg md:justify-between items-center">
                <div className="cols-1">
                    <label className="font-bold text-white text-xl p-3">Id pedido: {pedido._id}</label>
                    <img className="bordered border-2 " src={imagen} alt="No resource" width="180" />
                </div>
                <div className="flex, flex-col, items-start p-3 border-2 border-gray-900 rounded-lg">

                    <p className="mb-1 text-xl text-gray-50 font-bold">
                        producto comprado: {nombre}
                    </p>

                    <p className="mb-1 text-xl text-gray-50 ">
                        Comprador: {nombreComprador}
                    </p>
                    <p className="mb-1 text-xl text-gray-50">
                        Email: {emailComprador}
                    </p>
                    <p className="mb-1 text-xl text-gray-50">
                        Dirección de entrega: {direccionComprador}
                    </p>
                    <p className="mb-1 text-xl text-gray-50">
                        Teléfono de contacto: {telefono}
                    </p>
                    <p className="mb-1 text-xl text-gray-50">
                        Cantidad unidades compradas: {unidades}
                    </p>
                    <p className="mb-1 text-xl text-gray-50">
                        Valor total de la compra: ${totalPedido}.00
                    </p>
                    <p className="mb-1 text-xl text-gray-50">
                        Fecha de la compra: {format(parseISO(fechaPedido), 'yyyy/mm/dd')}
                    </p>
                </div>
            </div>
            <br/>
        </>
    );
}
export default ViewPedido;