import axios from "axios";

    async function submitMovieLike(data) {

        console.log("data: ", data);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/movie-likes", 
                data,  
                {
                    withCredentials: true,  
                }
            );
            console.log("Response:", response);
            if (response.status === 201) {          
                console.log("Like saved for movie");
                return "Success"
            } else {
                return ("Movie Like failed. Please try again");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            return "An error occurred. Please try again";
        }
    }


    async function removeMovieLike(movieId, userId) {
        try {
            const response = await axios.delete(
                'http://localhost:8080/like/movies', {
                    data: { movieId, userId },  
                    withCredentials: true,
                }
            );
            console.log("Response:", response);
            if (response.status === 200) { 
                console.log("Like removed for movie");
                return "Success"
            } else {
                return ("Removing the like failed. Please try again");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return ("An error occurred. Please try again");
        }
    }

    export { submitMovieLike, removeMovieLike };