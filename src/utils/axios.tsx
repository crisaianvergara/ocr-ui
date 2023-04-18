import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

let token = null;

if (typeof window !== 'undefined') {
    token = window?.sessionStorage.getItem('token');
};

const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const post = async (url: string, body: object, isPrivate = true) => await axios.post(`${API_URL}/${url}`, body, isPrivate ? { headers } : {});
export const put = async (url: string, body: object) => await axios.put(`${API_URL}/${url}`, body, { headers });
export const get = async (url: string) => await axios.get(`${API_URL}/${url}`, { headers });
export const destroy = async (url: string) => await axios.delete(`${API_URL}/${url}`, { headers });

