import axios from 'axios';

const clientAxios = axios.create({
    baseURL: `https://desafio-palindromo.onrender.com`
});

export default clientAxios;