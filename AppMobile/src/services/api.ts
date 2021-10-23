import axios from "axios";

const api = axios.create({
    baseURL: 'http://0aa0-187-3-218-146.ngrok.io/'
});

export default api;