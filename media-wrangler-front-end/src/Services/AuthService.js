const API_BASE_URL = 'http://localhost:8080';

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'inclue',
            body: JSON.stringify(credentials),
        });

        if (response.ok) {
            const data = await response.text();
            return { success: true, message: error };
        }
    } catch (error) {
        return { success: false, message: 'Network error' };
    }
};

export const logout = async () => {
    try {
        const response = await fetch (`${API_BASE_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            return { success: true, message: 'Logout successful' };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Logout failed' };
        }
    } catch (error) {
        return { success: false, message: 'Network error' };
    }
};

export const checkSession = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/session-status`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            return { success: true };
        } else {
            return { success: false };
        }
    } catch (error) {
        return { success: false, message: 'Network error' };
    }
};