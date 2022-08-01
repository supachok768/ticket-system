import axios from 'axios';

const baseUrl = 'http://localhost:3001'
const instance = createInstance(baseUrl);

function createInstance(baseURL) {
    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    });
}
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default instance