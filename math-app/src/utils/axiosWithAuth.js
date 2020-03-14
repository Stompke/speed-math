import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: 'https://minute-math.herokuapp.com/',
        // baseURL: 'http://localhost:5000/',
        headers: {
            authorization: token
        }
    });
};
