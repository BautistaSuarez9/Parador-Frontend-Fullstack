import React, { useState, useEffect } from 'react';
import API from '../services/api';

function Reservas() {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        API.get('/reservas')
            .then(res => setReservas(res.data))
            .catch(err => console.error('Error al obtener reservas:', err));
    }, []);

    return (
        <div>
            <h2>Listado de reservas</h2>
            <ul>
                {reservas.map(reserva => (
                    <li key={reserva._id}>
                        Cliente: {reserva.clienteNombre} | Producto: {renderProductos(reserva)} | Fecha: {formatearFecha(reserva.fechaInicio)} | Estado: {reserva.estado}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function renderProductos(reserva) {
    // Soporta tanto reservas con 1 producto (productoId) como múltiples productos (productos[])
    if (reserva.productos && reserva.productos.length > 0) {
        return reserva.productos.map(prod => prod.nombre).join(', ');
    } else if (reserva.productoId) {
        return reserva.productoId.nombre;
    } else {
        return 'Sin producto';
    }
}

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString();
}

export default Reservas;
