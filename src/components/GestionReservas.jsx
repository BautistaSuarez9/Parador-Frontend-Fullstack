import React, { useEffect, useState } from 'react';
import API from '../services/api';

function GestionReservas() {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        cargarReservas();
    }, []);

    const cargarReservas = () => {
        API.get('/reservas')
            .then(res => setReservas(res.data))
            .catch(err => console.error(err));
    };

    const confirmarPago = (id) => {
        API.put(`/reservas/pagar/${id}`)
            .then(res => {
                alert("Pago confirmado.");
                cargarReservas();
            })
            .catch(err => {
                console.error(err);
                alert("No se pudo confirmar el pago.");
            });
    };

    const cancelarReserva = (id) => {
        API.delete(`/reservas/${id}`)
            .then(res => {
                alert("Reserva cancelada.");
                cargarReservas();
            })
            .catch(err => {
                console.error(err);
                alert("No se pudo cancelar la reserva.");
            });
    };

    const finalizarReserva = (id) => {
        API.put(`/reservas/finalizar/${id}`)
            .then(res => {
                alert("Reserva finalizada.");
                cargarReservas();
            })
            .catch(err => {
                console.error(err);
                alert("No se pudo finalizar la reserva.");
            });
    };

    return (
        <div>
            <h2>Gestión de reservas</h2>
            <ul>
                {reservas.map(reserva => (
                    <li key={reserva._id}>
                        Cliente: {reserva.clienteNombre} | Estado: {reserva.estado}{" "}

                        {reserva.estado === "pendiente" && (
                            <>
                                <button onClick={() => confirmarPago(reserva._id)}>Confirmar pago</button>
                                {" "}
                                <button onClick={() => cancelarReserva(reserva._id)}>Cancelar</button>
                            </>
                        )}

                        {reserva.estado === "confirmada" && (
                            <button onClick={() => finalizarReserva(reserva._id)}>Finalizar</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GestionReservas;
