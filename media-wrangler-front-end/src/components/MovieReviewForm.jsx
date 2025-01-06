import React, { useState } from 'react'

const MovieReviewForm = () => {

    //state variables for the input capture
    const [review, setReview] = useState("");

    //handleSubmit function 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("http://localhost:8080/api/users/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ review }),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("Review submitted successfully:", data);
          } else {
            console.error("Failed to submit review:", response.status);
          }
        } catch (error) {
          console.error("Error submitting review:", error);
        }
      };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Review:
        <input 
            name="review"
            type="text" 
            placeholder='Enter something'
            value= { review } 
            onChange={(e) => setReview(e.target.value)}/>
        </label>
            <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default MovieReviewForm




