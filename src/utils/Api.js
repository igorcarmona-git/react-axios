import axios from "axios";

export default axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    timeout: 10000 //Define o tempo limite (em milissegundos) para esperar uma resposta do servidor antes de cancelar a solicitação.
})

export const API_TASKS = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 10000
})

//Quando utiliza export, a função fica exposta para a aplicação