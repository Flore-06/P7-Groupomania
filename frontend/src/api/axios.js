//Axios is a Javascript library used to make HTTP requests from node. js or XMLHttpRequests from the browser
import axios from 'axios';
const BASE_URL = 'http://localhost:4200/api';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});