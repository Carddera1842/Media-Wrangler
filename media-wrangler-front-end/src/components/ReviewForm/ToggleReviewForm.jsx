import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import './ReviewForm.css';
import 'bulma/css/bulma.min.css';

const ToggleReviewForm = ({ title, genre, releaseDate, poster, id }) => {

    // State variables needed to capture user input
    const [dateWatched, setDateWatched] = useState("");
    const [review, setReview] = useState('');
    const [spoiler, setSpoiler] = useState('no');
    const [rating, setRating] = useState(0); 
    const [tags, setTags] = useState([]);

    //This is the tags function. Just splits the string into array elements currently...
  function tagElements(e) {
    let reviewTags = (e.target.value).split(",");
    setTags(reviewTags);

    //if this is how we want to do the tags, I need to trim any whitespaces users could potentially enter
  }

    // State variable to activate toggle
    const [useWesternLabels, setUseWesternLabels] = useState(false);

    // Western Twist Labels
    const westernLabels = {
        rating: "Six-Gun Rating",
        review: "The Story You Rode In On",
        actors: "Outlaw Cast",
        director: "Sheriff's Command",
        dateWatched: "The Day of Reckoning", 
        // watchAgain: "Would You Ride this Trail Again",    <--- I have to add the watch again input field
        spoiler: "Guarding the Secret, Partner?", 
        tags: "Stamp Your Brand on This One",
        submit: "Lock It In, Outlaw"
    };

    // Standard Labels
    const standardLabels = {
        rating: "Rating",
        review: "Review",
        actors: "Actors",
        director: "Director",
        dateWatched: "Date Watched",
        spoiler: "Review Contain Spoilers?",
        tags: "Add Tags",
        submit: "Submit"
    };

    // Toggle function to switch between western and standard labels -- bounces back and fourth with each click
    function toggleLabels() {
        setUseWesternLabels(!useWesternLabels);
    };

    // Get the labels based on toggle state
    const labels = useWesternLabels ? westernLabels : standardLabels;


    //
    function handleSubmit(e) {
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
          rating, 
          tags, 
          title, 
          genre, 
          id, 
          poster 
        }
  
        alert("Thank you for your submission!");
        console.log(movieReview);
        
    }

    return (
        <div>      
        {/* Toggle Button */}
        <button onClick={toggleLabels}>
            {useWesternLabels ? "Classic Tales" : "Cowboy Chronicles"}
        </button>



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
                    <label className="label">{labels.dateWatched}</label>
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
                      <div>
                  <label className="checkbox">
                    <input 
                      type="checkbox"
                      value={ spoiler === "yes" }
                      onChange={(e) => setSpoiler(e.target.value)} 
                    />
                    &nbsp; {labels.spoiler}
                  </label>
                  </div>
                      </div>                        
                    </div>
                  </div>
                </div>

                <br />               


{/* Comments Text Box */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">{labels.review}</label>
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
                    <label className="label">{ labels.tags }</label>
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
                    <label className="label">{ labels.rating }</label>
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
                            { labels.submit }
                          </button>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </form>
          </div>       
      
        </div>
    );
};


export default ToggleReviewForm;
