import React, { useState } from 'react';
import API from '../services/api';

function ProductosDisponibles() {
    const [fechaInicio, setFechaInicio] = useState('');
    const [cantidadTurnos, setCantidadTurnos] = useState(1);
    const [productos, setProductos] = useState([]);

    const buscarDisponibles = () => {
        if (!fechaInicio || !cantidadTurnos) {
            alert("Completá fecha y cantidad de turnos");
            return;
        }

        API.get('/productos/disponibles', {
            params: {
                fechaInicio: fechaInicio,
                cantidadTurnos: cantidadTurnos
            }
        })
            .then(res => setProductos(res.data))
            .catch(err => {
                console.error(err);
                alert("Error al buscar productos disponibles");
            });
    };

    return (
        <div>
            <h2>Consultar Productos Disponibles</h2>

            <div>
                <label>Fecha inicio:</label>
                <input type="datetime-local" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} required />
            </div>

            <div>
                <label>Cantidad de turnos (máx 3):</label>
                <input type="number" min="1" max="3" value={cantidadTurnos} onChange={e => setCantidadTurnos(e.target.value)} required />
            </div>

            <button onClick={buscarDisponibles}>Buscar</button>

            <h3>Productos disponibles:</h3>
            <ul>
                {productos.map(prod => (
                    <li key={prod._id}>{prod.nombre} - ${prod.precioPorTurno}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProductosDisponibles;
