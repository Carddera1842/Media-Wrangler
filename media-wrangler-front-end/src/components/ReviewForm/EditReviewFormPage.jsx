import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AwardReviewForm from './AwardReviewForm'
import { fetchMovieReviewByUserIdAndMovieReviewId, fetchMovieReview } from '../../Services/MovieReviewService';
import { useAuth } from '../../Services/AuthContext';
import EditReviewForm from '../ReviewForm/EditReviewForm';


const EditReviewFormPage = () => {
    

    const { id } = useParams(); 
    const [review, setReview] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const { user } = useAuth();
    // const userId = user.id;
    console.log("This is the user object:", user);
    

    useEffect(() => {
        async function fetchReview() {
          try {
            const data = await fetchMovieReview(id);
           
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
  }, [id]);
      



  return (
    <div>
      <h1>Edit Review: </h1>
      {review && <EditReviewForm 
                    existingReview={review}                     
                />}
    </div>
  )
}

export default EditReviewFormPage
