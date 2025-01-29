import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JournalReviewCard from "./JournalReviewCard";
import { fetchMovieReview } from "../../Services/MovieReviewService";
import '../../stylings/JournalDisplayReview.css';





export default function JournalDisplayReview() {
    const { id } = useParams();
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchData() {
            const data = await fetchMovieReview(id);
            setReview(data);
            setLoading(false);
        };
        fetchData();
    }, [id]);


    if (loading) {
        return <p>Loading review...</p>;
    }


    if (!review) {
        alert("No review was found.");
    }

    const formattedDate = new Date(review.dateWatched).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    return (
        <>
            <div className='user-review-page-background '>
                <h1>Movie Review:</h1>
                <JournalReviewCard 
                    title = { review.title }
                    fullPosterURL = { review.fullPosterURL }
                    watchAgain = { review.watchAgain }
                    tags = { review.tags }
                    rating = { review.ratingValue }
                    isSpoiler = { review.isSpoiler }
                    review = { review.review }
                    dateWatched = { formattedDate }
                    award = { review.award }
                    yearReleased = { review.yearReleased }
                    username = { review.username }
                    firstname = { review.username }
                    lastname = { review.lastname }  
                    userId = { review.userId }
                />
            </div>
        </>
    );
 
}


