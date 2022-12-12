import React from "react";

const Producto = (props) => {

    const {image, nombre, stock, precio} = props;

    return (
        <>
        <div>
            <input type="image" src={image}/>
            <input type="text" value={nombre}/>
            <input type="number" value={stock}/>
            <input type="number" value={precio}/>
            <input type="button" value="Agregar al carrito" />
        </div>
        </>
    );
}

export default Producto;