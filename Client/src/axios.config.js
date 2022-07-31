import axios from 'axios';

const baseUrl = 'http://localhost:3001'
export default createInstance(baseUrl);

function createInstance(baseURL) {
    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        }
    });
}
