import axios from "axios";

const API_BASE_URL = 'http://localhost:8080';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
            withCredentials: true
        });

        if (response.status === 200) {
            return { success: true, message: response.data.message };
        }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Network error' };
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/logout`, {}, {
            withCredentials: true
        });

        if (response.status === 200) {
            return { success: true, message: 'Logout successful' };
        } 
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, message: error.response?.data?.message || 'Network error'}
    }
};

export const checkSession = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/session-status`, {
            withCredentials: true
        });

        if (response.status === 200) {
            return { success: true };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.error("Error during session check:", error);
        return { success: false, message: 'Network error' };
    }
};