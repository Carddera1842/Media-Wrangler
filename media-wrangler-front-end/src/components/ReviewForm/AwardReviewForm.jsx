import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import 'bulma/css/bulma.min.css';
import './ReviewForm.css';
// import StarRatings from 'react-star-ratings'; //eventually switch to the MUI star rating that is being used in MovieInteraction
import { apiMovieReview } from "../../Services/MovieReviewService";
import PropTypes from 'prop-types';
import StarRatingButton from "../MovieInteractions/StarRatingButton";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


function AwardReviewForm({title, genre, releaseDate, poster, id}) {

  const [dateWatched, setDateWatched] = useState("");
  const [review, setReview] = useState('');
  const [isSpoiler, setSpoiler] = useState(false);
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [award, setAward] = useState(null);
  const [lovedAward, setLovedAward] = useState("");
  const [hatedAward, setHatedAward] = useState("");
  const [isLovedDisabled, setLovedDisabled] = useState(false);
  const [isHatedDisabled, setHatedDisabled] = useState(false);
  const [wouldWatchAgain, setWatchAgain] = useState('');
 
  const navigate = useNavigate();

  //NOTE: Should I make these an Enum Class?
  const lovedAwards = [
    { value: "golden-spurs", label: "Golden Spurs", description: "Awarded to movies that shine like gold!", icon: "⭐" },
    { value: "best-sharpshooter", label: "Best Sharpshooter", description: "For flawless direction or acting – a real bullseye!", icon: "🎯" },
    { value: "whiskey-shot", label: "Whiskey Shot Worthy", description: "Satisfyingly smooth – worth raising a glass!", icon: "🥃" },
];

  const hatedAwards = [
    { value: "dusty-trails", label: "Dusty Trails", description: "For a movie that was a long, boring journey.", icon: "👎" },
    { value: "snake-oil", label: "Snake Oil", description: "All show, no substance.", icon: "💔" },
    { value: "cactus-hugger", label: "Cactus Hugger", description: "A prickly, uncomfortable experience.", icon: "🌵" },
  ];

  //TODO: get the tag to work... 
  //if this is how we want to do the tags, I need to trim any whitespaces users could potentially enter
  //This is the tags function. Just splits the string into array elements currently...
  function tagElements(e) {
    let reviewTags = (e.target.value).split(",");
    setTags(reviewTags);    
  }
 
  function handleHatedAward(e){
    setHatedAward(e.target.value);
    setAward(e.target.value);
    setLovedDisabled(true);
    setHatedDisabled(false);
  }

  function handleLovedAward(e){
    setLovedAward(e.target.value);
    setAward(e.target.value);
    setHatedDisabled(true);
    setLovedDisabled(false);    
  }

  function resetAwards() {
    setHatedAward("");
    setLovedAward("")
    setHatedDisabled(false); 
    setLovedDisabled(false); 
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
      if(isSpoiler === false) {
        const submission = window.confirm("Are you sure there are no spoilers? If so, press ok to continue submitting your review?");
        if(submission === false) {
          alert("Canceling the Movie Review Submission");
        return;
        }
      }

      const movieReviewData = { 
        dateWatched,
        review,
        isSpoiler,
        award,
        rating,
        tags,
        title,
        genre,
        id,
        poster
      }

      alert("Thank you for your submission!");
      console.log(movieReviewData);
      console.log(isSpoiler) //TODO: once spoiler is logging right in database, remove this

      try {
        const responseMessage = await apiMovieReview(movieReviewData); 

        if (responseMessage === "Success") {
          navigate("/review"); 
        } else {
          setError(responseMessage);
        }
        
      } catch (error) {
          console.error("Unexpected error during movie review submission: ", error);
          setError({error: "An unexpected error occurred. Please try again"})
      }
    };

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
{/* MUI star rating -- couldn't get the StarRatingButton to render here */}
                        <Stack spacing={1} direction="row" >
                          <Rating 
                              name="half-rating" 
                              defaultValue={0} 
                              precision={0.5} 
                              onChange={(e) => setRating(e.target.value)}
                              sx={{
                                '& .MuiRating-iconFilled': {
                                    color: '#ff9800', // Color for filled stars (e.g., amber)
                                },
                                '& .MuiRating-iconEmpty': {
                                    color: '#e0e0e0', // Color for empty stars (e.g., light gray)
                                },
                                '& .MuiRating-iconHover': {
                                    color: '#ffcc00', // Hover color for stars (e.g., yellow)
                                },
                            }}
                          />      
                        </Stack>
                      </div>                        
                    </div>
                  </div>
                </div>
                <br />                
{/* Positive Movie Award Dropdown */}
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <label className="label has-text-centered" htmlFor="loved-award">
                      Love It Award:
                    </label>
                    <div className="select is-warning">
                    <select
                      id="loved-award"
                      name="loved-award"
                      value={lovedAward}
                      onChange={handleLovedAward}
                      disabled={isLovedDisabled}
                    >
                      <option value="">-- Select an Award --</option>
                      {lovedAwards.map((award) => (
                      <option key={award.value} value={award.value} title={award.description}>
                          {award.icon} {award.label}
                      </option>
                      ))}
                    </select>
                  </div>
                </div>
{/*Reset Button for dropdowns */}
                <button className="is-centered"
                  type="button"
                  onClick={resetAwards}
                >
                  VS <br /> RESET
                </button>                    
{/* Negative Movie Award Dropdown */}
                <div className="control">
                    <label className="label has-text-centered" htmlFor="hated-award">
                      Hated It Award:
                    </label>
                    <div className="select is-warning">
                    <select
                      id="hated-award"
                      name="hated-award"
                      value={hatedAward}
                      onChange={handleHatedAward}
                      disabled={isHatedDisabled}
                    >
                      <option value="">-- Select an Award --</option>
                      {hatedAwards.map((award) => (
                      <option key={award.value} value={award.value} title={award.description}>
                          {award.icon} {award.label}
                      </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <br />
{/* Spoiler Checkbox  */}                
                    <div className="inline-form">
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          value={ isSpoiler }
                          onChange={(e) => setSpoiler(!isSpoiler)}
                        />
                          &nbsp; Does Review Contain Spoilers?
                      </label>                        
                    </div>
                    <br />     
                  </div>                 
                  <br />  
                  <div> 
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
{/* Would you watch again Radio buttons */}
                  <div>
                    <label className="radio"> Would You Recommend This Movie? &nbsp;&nbsp;&nbsp;
                      <input
                        type="radio"
                        name="watchAgain"
                        value="yes"
                        checked={wouldWatchAgain === 'yes'} // Bind state to the "yes" radio button
                        onChange={() => setWatchAgain('yes')} // Set state to 'yes' when selected
                      />
                      &nbsp; Yes
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        name="watchAgain"
                        value="no"
                        checked={wouldWatchAgain === 'no'} // Bind state to the "no" radio button
                        onChange={() => setWatchAgain('no')} // Set state to 'no' when selected
                      />
                      &nbsp; No
                    </label>
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
                  {/* Just a bunch of divs to center the button, I can go in a do some css later for it */}     
                  <div className="field is-horizontal">
                    <div className="field-label"></div>
                    <div className="field-label"></div>
                    <div className="field-label"></div>
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


export default AwardReviewForm;

AwardReviewForm.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    releaseDate: PropTypes.string, 
    overview: PropTypes.string, 
    poster: PropTypes.string,
    genre: PropTypes.array
}
