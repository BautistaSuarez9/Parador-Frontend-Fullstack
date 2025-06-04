import axios from 'axios';

// Definimos la URL base de nuestro backend
const API = axios.create({
    baseURL: 'http://localhost:3000/api'
});

export default API;
