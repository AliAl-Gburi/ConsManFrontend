import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.1.109:3000',
    headers: { 'Content-type': 'application/json' },
});

export default instance;