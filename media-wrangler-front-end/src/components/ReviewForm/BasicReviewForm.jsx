
import { useState } from "react";
import React from "react";
import './BasicReviewForm.css'

function ReviewForm(){
    
    const [title, setTitle] = useState('');
    const [dateWatched, setDateWatched] = useState(null);
    const [review, setReview] = useState('');
    const [spoiler, setSpoiler] = useState('no')

    const handleSubmit = (e) => {
        e.preventDefault();
        const review = { title, dateWatched, review, spoiler }

        console.log(review);
    }

    return(
        <>
            <div className="create-review">
                <h3>Movie Title (year) </h3>
                <h6>Genre Categories</h6>
                <br />
                <form onSubmit={handleSubmit} >
                   {/* <label>Movie Title: </label> 
                   <input 
                        type="text"
                        required
                        value={ title }
                        onChange={(e) => setTitle(e.target.value)}
                    /> */}
                    <label>Watched on: </label> 
                    <input 
                        type="date"
                        required
                        value={ dateWatched }
                        onChange={(e) => setDateWatched(e.target.value)}
                    />
                    <label>Review: </label> 
                    <textarea 
                        required
                        value={ review }
                        placeholder="Write your review here..."
                        rows="10"
                        onChange={(e) => setReview(e.target.value)}
                    ></textarea> 

                    <label>Does Review Contain Spoilers? </label>
                    <select
                        value={ spoiler }
                        onChange={(e) => setSpoiler(e.target.value)}
                    >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>              
                    <br />
                    <br />
                    <button >Add Review </button>                   
                </form>
            </div>      
        </>
    );
}

export default ReviewForm;
