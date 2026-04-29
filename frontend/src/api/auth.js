import axios from 'axios';
import conf from '../conf/conf.js';

const API_URL = conf.apiUrl + '/api/auth';

export class AuthService {
    async createAccount({ email, password, name }) {
        try {
            const response = await axios.post(`${API_URL}/register`, { email, password, name });
            if (response.data) {
                return this.login({ email, password });
            }
            return { ...response.data, $id: response.data?._id };
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message);
        }
    }

    async login({ email, password }) {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return { ...response.data, $id: response.data?._id };
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message);
        }
    }

    async getCurrentUser() {
        try {
            const token = localStorage.getItem('token');
            if (!token) return null;

            const response = await axios.get(`${API_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return { ...response.data, $id: response.data?._id };
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error);
            localStorage.removeItem('token');
            return null;
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token');
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;