import axios from "axios"

const API_BASE_URL = "http://localhost:8080/api/movies";

export const getPopularMovies = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/popular`, {
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            }
        });
        return response.data.results || [];
    } catch (error) {
        console.error("Error fetching user popular movies:", error);
        return [];
    }
};