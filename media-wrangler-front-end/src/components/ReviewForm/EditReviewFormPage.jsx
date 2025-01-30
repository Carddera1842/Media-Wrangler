import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AwardReviewForm from './AwardReviewForm'
import { fetchMovieReviewByUserIdAndMovieReviewId, fetchMovieReview } from '../../Services/MovieReviewService';
import { useAuth } from '../../Services/AuthContext';


const EditReviewFormPage = () => {


    

    const { id } = useParams(); // Get the review ID from the URL
    const [review, setReview] = useState(null); // Store the review data
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const { user } = useAuth();
    const userId = user.id;
    console.log("This is the user object:", user);
    console.log("this is the user id:", userId);


    //We are getting the movie review id from the param and the userId is coming from the useAuth


    // useEffect(() => {
    //     async function fetchReview() {
    //       try {
    //         const data = await fetchMovieReview(id);
    //         console.log("this is what the data is:", data);
    //         if (data && typeof data !== 'string') {
    //           setReview(data); 
    //           setEditMode(true);
    //         } else {
    //           setError(data); 
    //         }
    //       } catch (err) {
    //         setError("An error occurred while fetching the review.");
    //         console.log('Error fetching review:', err);
    //       }
    //       setLoading(false); 
    //     };
    
    //     fetchReview();
    //   }, [id]);
    

      useEffect(() => {
        async function fetchReview() {
          try {
            const data = await fetchMovieReviewByUserIdAndMovieReviewId(id,userId);
            console.log("this is what the data is:", data);
            if (data && typeof data !== 'string') {
              setReview(data); 
              setEditMode(true);
            } else {
              setError(data); 
            }
          } catch (err) {
            setError("An error occurred while fetching the review.");
            console.log('Error fetching review:', err);
          }
          setLoading(false); 
        };
    
        fetchReview();
      }, [id, userId]);
    



  return (
    <div>
      <h1>Edit Review: </h1>
      {review && <AwardReviewForm 
                    existingReview={review} 
                    editMode={ editMode }
                />}
    </div>
  )
}

export default EditReviewFormPage
