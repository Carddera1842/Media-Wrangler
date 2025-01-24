import axios from "axios";

    async function submitMovieRating(data) {

        console.log("data: ", data);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/rating", 
                data,  
                {
                    withCredentials: true,  
                }
            );
            console.log(data);
            console.log("Response:", response);
            if (response.status === 201) {          
                console.log("Rating saved for movie");
                return "Success"
            } else {
                return ("Movie Rating failed. Please try again");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            return "An error occurred. Please try again";
        }
    }


    async function checkIfUserRatedMovie(movieId, userId) {
        try {
            const response = await axios.get(`http://localhost:8080/api/rating/check-rating/${movieId}/${userId}`, {
                withCredentials: true
            });
            console.log("has movie been rated: ", response.data);
            return response.data; 
        } catch (error) {
            console.error("Error checking rating status:", error);
            return false; 
        }
    }


   
    async function updateMovieRating({ movieId, userId, rating: newRating }) {

        try {
            const response = await axios.put(
                "http://localhost:8080/api/rating/update", 
                { userId, movieId, rating: newRating },  
                {
                    withCredentials: true,  
                }
            );
            console.log("Response:", response);
            if (response.status === 201) {          
                console.log("Rating updated for movie");
                return "Success"
            } else {
                return ("Movie Rating update failed. Please try again");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            return "An error occurred. Please try again";
        }
    }


    async function fetchMovieRating(movieId, userId) {
        try {
            const response = await axios.get(`http://localhost:8080/api/rating/view/${movieId}/${userId}`, {
                withCredentials: true,
            });

            if (response.status === 200) {
                const ratingData = response.data;
                console.log("current movie rating: ", ratingData);
                return ratingData; 
            } else {
                return "Rating not found or error occurred. Please try again";
            }
        } catch (error) {
            console.error("Error fetching current movie rating:", error);
            return 0; 
        }
    }



    export { submitMovieRating, checkIfUserRatedMovie, updateMovieRating, fetchMovieRating };