import React, { useState, useEffect } from 'react';
import API from '../services/api';

function ReservaForm() {
    const [productos, setProductos] = useState([]);
    const [clienteNombre, setClienteNombre] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [cantidadTurnos, setCantidadTurnos] = useState(1);
    const [metodoPago, setMetodoPago] = useState('efectivo');
    const [mensaje, setMensaje] = useState('');
    const [cantidadPersonas, setCantidadPersonas] = useState(1);


    useEffect(() => {
        API.get('/productos')
            .then(res => setProductos(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevaReserva = {
            clienteNombre,
            productos: [productoSeleccionado],
            fechaInicio,
            cantidadTurnos,
            metodoPago,
            moneda: "ARS",
            cantidadPersonas  // 🔥 AÑADIMOS ESTA LÍNEA
        };


        API.post('/reservas', nuevaReserva)
            .then(res => {
                setMensaje("Reserva creada correctamente ✅");
                limpiarFormulario();
            })
            .catch(err => {
                console.error(err);
                setMensaje("Error al crear la reserva ❌");
            });
    };

    const limpiarFormulario = () => {
        setClienteNombre('');
        setProductoSeleccionado('');
        setFechaInicio('');
        setCantidadTurnos(1);
        setMetodoPago('efectivo');
    };

    return (
        <div>
            <h2>Crear nueva reserva</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Cliente:</label>
                    <input value={clienteNombre} onChange={e => setClienteNombre(e.target.value)} required />
                </div>

                <div>
                    <label>Producto:</label>
                    <select value={productoSeleccionado} onChange={e => setProductoSeleccionado(e.target.value)} required>
                        <option value="">Seleccionar</option>
                        {productos.map(prod => (
                            <option key={prod._id} value={prod._id}>{prod.nombre}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Fecha inicio:</label>
                    <input type="datetime-local" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} required />
                </div>

                <div>
                    <label>Cantidad de turnos:</label>
                    <input type="number" min="1" max="3" value={cantidadTurnos} onChange={e => setCantidadTurnos(e.target.value)} required />
                </div>
                <div>
                    <label>Cantidad de personas:</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={cantidadPersonas}
                        onChange={e => setCantidadPersonas(parseInt(e.target.value))}
                        required
                    />
                </div>

                <div>
                    <label>Método de pago:</label>
                    <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)} required>
                        <option value="efectivo">Efectivo</option>
                        <option value="transferencia">Transferencia</option>
                    </select>
                </div>

                <button type="submit">Crear reserva</button>
            </form>

            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default ReservaForm;
