import axios from "axios";

async function submitUserComment(userCommentData) {
    try {
        const response = await axios.post(
            'http://localhost:8080/comments/create',
            userCommentData, {
                withCredentials: true,
            }
        );
        console.log("Response:", response);
        if (response.status === 201) {          
            console.log("Saving User Comment");
            return "Success"
        } else {
            return ("User Commenting failed. Please try again");
        }
    } catch (error) {
        return ("An error occurred. Please try again", error);
    }
}


async function fetchCommentsByMovieReviewId(movieReviewId) {
    try {
        const response = await axios.get(`http://localhost:8080/comments/review/${movieReviewId}`, { withCredentials: true });


        if (response.status === 200) {
            const reviewCommentList = response.data;
            console.log('Review Comment List: ', reviewCommentList);
            return reviewCommentList;
        } else {
            return "Review comments not found or error occurred. Please try again";
        }
    } catch (error) {
        console.log("Error: ", error);
        return "An error occurred. Please try again";
    }
};

export { submitUserComment, fetchCommentsByMovieReviewId };