import { useState } from "react";
import React from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

import 'bulma/css/bulma.min.css';
import './ReviewForm.css';


import StarRatings from 'react-star-ratings'; //eventually switch that out for the MUI star rating that is being used in MovieInteraction 
import { apiCreateReview } from "../../Services/ReviewService";



function ReviewForm({title, genre, releaseDate, poster, id}) {


  const [dateWatched, setDateWatched] = useState("");
  const [review, setReview] = useState('');
  const [spoiler, setSpoiler] = useState('no');
  const [movieMVP, setMovieMVP] = useState('');
  const [rating, setRating] = useState(0); 
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  
  //This is the tags function. Just splits the string into array elements currently...
  function tagElements(e) {
    let reviewTags = (e.target.value).split(",");
    setTags(reviewTags);

    //if this is how we want to do the tags, I need to trim any whitespaces users could potentially enter
  }
  

 
  async function handleSubmit(e) {
      e.preventDefault();

      
      if(!dateWatched) {
        alert("You must pick a Date Watched to log in journal.");
        return;
      }
      if(!review){
        alert("Let your peers know what you thought, write your review.");
      }      
      if(rating === 0){
        alert("You must rate the movie.");
        return;
      } 
      if(spoiler === "no") {
        const submission = window.confirm("Are you sure there are no spoilers? If so, press ok to continue submitting your review?");
        if(submission === false) {
          alert("Canceling the Movie Review Submission");
        return;
        } 
      }

      const movieReview = {
        dateWatched, 
        review, 
        spoiler, 
        movieMVP, 
        rating, 
        tags, 
        title, 
        genre, 
        id, 
        poster 
      }

      alert("Thank you for your submission!");
      console.log(movieReview);
           
      


      //TODO: Figure out how to get the POST request to send back JSON and be accepted by Spring Boot (CORS is blocking POST requests)

      //NOTE: I reference register branch for how a service would be incorporated hoping it would magical fix everything. 
      // const responseMessage = await apiCreateReview(movieReview); 

      //NOTE: I believe this is how it would work without the MoveReviewService. 
      const responseMessage = await fetch('http://localhost:8080/api/reviews/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieReview)
      });

      //NOTE: Trying to see what is happening with the fetch
      console.log(responseMessage);
    
      //NOTE: This was from register branch, works with the service and directs the navigation if working properly
      if (responseMessage === "Success") {
          navigate("/reviews/submitted");    //Probably eventually want it to direct to user journal so they can see the review as an entry
      } else {
          setError(responseMessage);
      }

      

  }





 
    return (
        <>
          <div className="review-container">

{/* Movie Poster Image */}
            <div className="poster">
              <img src={ poster } ></img>
            </div>

{/* Movie Review Form */}
            <form onSubmit={handleSubmit}>              
              <div className="review-form">
                <div className="content is-normal">
                  <h1>{ title } ({ releaseDate })</h1>                  
                  <p>{ genre.join(", ") }</p>
                </div>
            
              

{/* Movie Watched Date */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Watched </label>
                  </div>  
                  <div className="field-body">
                    <div className="field">
                      <p className="control is-expanded has-icons-left">
                        <input
                          required 
                          className="input is-info" 
                          type="date" 
                          value={ dateWatched }
                          onChange={(e) => setDateWatched(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-user"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <div className="field-label is-normal">
                      </div>                        
                    </div>
                  </div>
                </div>

                <br />

{/* User can give MVP award for best aspect of film */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Movie MVP:</label>
                  </div>
                  <div className="field-body">
                    <div className="field is-narrow">
                      <div className="control">
                        <div className="select is-warning">
                          <select
                             value={movieMVP} 
                             onChange={(e) => setMovieMVP(e.target.value)} 
                          >
                            <option>Select your MVP </option>
                            <option>Plot/Story Line</option>
                            <option>Character Development</option>
                            <option>Cinematography</option>
                            <option>Soundtrack/Scoring</option>
                            <option>Special Effects</option>
                            <option>Costume and Set Design</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

{/* Contains Spoiler CheckBox */}
                  <div>
                  <label className="checkbox">
                    <input 
                      type="checkbox"
                      value={ spoiler === "yes" }
                      onChange={(e) => setSpoiler(e.target.value)} 
                    />
                    &nbsp; Does Review Contain Spoilers?
                  </label>
                  </div>

                </div>

                <br />

{/* Comments Text Box */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Review</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <textarea 
                          required
                          value={ review }
                          className="textarea" 
                          placeholder="Write your thoughts here ..." 
                          rows="10"
                          onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <br />

{/* Add Tags Section -- unfinished */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Add Tags</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input 
                          className="input is-danger" 
                          type="text" 
                          placeholder="tag name here ..." 
                          onChange={tagElements}                       
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <br />

{/* Built in React Star Rating Component */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Rating</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <StarRatings
                          rating={ rating }  
                          starRatedColor="teal"  
                          changeRating={(newRating) => setRating(newRating)}  
                          numberOfStars={5}  
                          name="rating"  
                          starDimension="20px"  
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label">
                    {/* <!-- Left empty for spacing --> */}
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <button className="button is-primary">
                            Submit Review
                          </button>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </form>
          </div>       
      </>
    );
}

export default ReviewForm;




// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!dateWatched || !review || rating === 0) {
//       alert("Please complete all required fields.");
//       return;
//   }

//   const movieReview = {
//       dateWatched,
//       review,
//       spoiler,
//       movieMVP,
//       rating,
//       tags,
//       title,
//       genre,
//       id,
//       poster,
//   };

//   try {
//       const response = await fetch('http://localhost:8080/api/reviews/create', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(movieReview)
//       });

//       if (!response.ok) {
//           throw new Error('Failed to save review.');
//       }

//       const data = await response.json();
//       alert('Review submitted successfully!');
//       console.log('Response:', data);
//   } catch (error) {
//       console.error('Error submitting review:', error);
//       alert('An error occurred while submitting your review.');
//   }
// };