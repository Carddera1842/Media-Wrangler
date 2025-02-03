import axios from "axios";


//NOTE: Used RegistrationService as reference 
export async function apiCreateReview(movieReview) {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/reviews/create",
            movieReview
        );
        console.log("Response:", response);
        if (response.status === 201) {
            console.log("Navigating to Review");
            return "Success"
        } else {
            return "Review Submission failed. Please try again"
        }
    } catch (error) {
        return "An error occured. Please try again"
    }
}