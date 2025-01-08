import axios from "axios";

export async function apiMovieReview(movieReviewData) {
    try {
        const response = await axios.post(
            'http://localhost:8080/reviews/create',
            movieReviewData, {
                withCredentials: true,
            }
        );
        console.log("Response:", response);
        if (response.status === 201) {
            // login();
            console.log("Saving Movie Review");
            // navigate("/registrationSuccess");
            return "Success"
        } else {
            // console.error("Login failed:", response);
            // setError("Registration failed. Please try again");
            return "Movie Review Submission failed. Please try again"
        }
    } catch (error) {
        // console.error("An error occurred:", error);
        // setError("An error occured. Please try again");
        return ("An error occured. Please try again", error);
    }
}