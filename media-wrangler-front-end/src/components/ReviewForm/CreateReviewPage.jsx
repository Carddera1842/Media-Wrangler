import React from "react";
import AwardReviewForm from './AwardReviewForm';
import { useLocation } from "react-router-dom";


export default function CreateReview() {


    const location = useLocation();

    console.log("Location state:", location.state);

    const { movieDetails } = location.state || {};


    return (
        <>
            <div className= "create-review-background">
                
                { movieDetails && (
                    <AwardReviewForm 
                        movieId={ movieDetails.id } 
                        title={ movieDetails.title } 
                        posterPath={ movieDetails.posterPath }
                        releaseDate={ movieDetails.releaseDate }
                        
                    />
                )}
            </div>
        </>      
    );
}

