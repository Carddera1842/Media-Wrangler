import axios from "axios";

export async function submitMovieReview(movieReviewData) {
    try {
        const response = await axios.post(
            'http://localhost:8080/reviews/create',
            movieReviewData, {
                withCredentials: true,
            }
        );
        console.log("Response:", response);
        if (response.status === 201) {          
            console.log("Saving Movie Review");
            return "Success"
        } else {
            return ("Movie Review Submission failed. Please try again");
        }
    } catch (error) {
        return ("An error occurred. Please try again", error);
    }
}