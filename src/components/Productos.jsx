import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Productos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        API.get('/productos')
            .then(res => {
                setProductos(res.data);
            })
            .catch(err => {
                console.error('Error al obtener productos:', err);
            });
    }, []);

    return (
        <div>
            <h2>Lista de productos:</h2>
            <ul>
                {productos.map(prod => (
                    <li key={prod._id}>
                        {prod.nombre} - ${prod.precioPorTurno}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Productos;
