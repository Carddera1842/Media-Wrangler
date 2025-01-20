import React, { useEffect, useState } from 'react';
import { fetchMovieReviewsByUser } from '../../Services/MovieReviewService';
import { useParams } from "react-router-dom";


function UserJournalPage() {

    const { userId } = useParams();
    const [reviews, setReviews] = useState(null);
    const [loading, setLoading] = useState(true);
   

    //This is going to fetch the users reviewData
    useEffect(() => {
        async function fetchData() {
            const data = await fetchMovieReviewsByUser(userId);
            setReviews(data);
            setLoading(false);
        };
        fetchData();
    }, [userId]);



    if (loading) return <p>Loading reviews...</p>;
    

    return (
        <div>
            <h1>Users Movie Reviews: </h1>
            {reviews.length === 0 ? (
                <p>No reviews found.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review.id} className="review-card">
                        <h3>Movie: {review.title}</h3>
                        <img src={review.fullPosterURL} alt={review.title} />
                        <p><strong>Rating:</strong> {review.rating}</p>
                        <p><strong>Review:</strong> {review.review}</p>
                        <p><strong>Watch Again:</strong> {review.watchAgain ? 'Yes' : 'No'}</p>
                        <p><strong>Year Released:</strong> {review.yearReleased}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default UserJournalPage;
