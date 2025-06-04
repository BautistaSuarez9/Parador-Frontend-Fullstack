import './App.css';
import React from 'react';
import Productos from './components/Productos';
import ReservaForm from './components/ReservaForm';
import Reservas from './components/Reservas';
import GestionReservas from './components/GestionReservas';
import ProductosDisponibles from './components/ProductosDisponibles';

function App() {
    return (
        <div className="container">
            <h1>Parador Playa Caribe</h1>
            <p className="subtitulo">Sistema de gestión de reservas</p>

            <section><Productos /></section>
            <section><ReservaForm /></section>
            <section><Reservas /></section>
            <section><GestionReservas /></section>
            <section><ProductosDisponibles /></section>

            <footer>Proyecto Full Stack - Defensa {new Date().getFullYear()}</footer>
        </div>
    );
}

export default App;
