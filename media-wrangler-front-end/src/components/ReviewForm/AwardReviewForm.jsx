import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import 'bulma/css/bulma.min.css';
import './ReviewForm.css';
import { apiMovieReview } from "../../Services/MovieReviewService";
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import InputTags from "../InteractiveSoloComponents/InputTags";
import { Checkbox } from "@mui/material";
import RadioButton from '../InteractiveSoloComponents/RadioButton';

// import StarRatingButton from "../MovieInteractions/StarRatingButton";  
// Couldn't render it properly as a child component inside form, but I think I was passing prop in the wrong direction
// Check out again, follow steps as I did in Tags input


function AwardReviewForm({title, genre, releaseDate, poster, movieId }) {

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
  const [watchAgain, setWatchAgain] = useState('');
 
  const navigate = useNavigate();

  //NOTE: Should I make these an Enum Class? I should 
  const lovedAwards = [
    { id: 1, value: "golden-spurs", label: "Golden Spurs", description: "Awarded to movies that shine like gold!", icon: "⭐" },
    { id: 2, value: "best-sharpshooter", label: "Best Sharpshooter", description: "For flawless direction or acting – a real bullseye!", icon: "🎯" },
    { id: 3, value: "whiskey-shot", label: "Whiskey Shot Worthy", description: "Satisfyingly smooth – worth raising a glass!", icon: "🥃" },
];

  const hatedAwards = [
    { id: 1, value: "dusty-trails", label: "Dusty Trails", description: "For a movie that was a long, boring journey.", icon: "👎" },
    { id: 2, value: "snake-oil", label: "Snake Oil", description: "All show, no substance.", icon: "💔" },
    { id: 3, value: "cactus-hugger", label: "Cactus Hugger", description: "A prickly, uncomfortable experience.", icon: "🌵" },
  ];
 
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

  function updateTags(updatedTags) {
    setTags(updatedTags);
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
        movieId,
        poster, 
        watchAgain
      }

      alert("Thank you for your submission!");
      console.log(movieReviewData);
      console.log(isSpoiler); //TODO: once spoiler is logging right in database, remove this

      try {
        const responseMessage = await apiMovieReview(movieReviewData); 

        if (responseMessage === "Success") {
          navigate("/reviews/view"); 
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
                  <div className="form-header">
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>
                      {title} <span style={{ fontSize: '20px', margin: '0', color: "teal" }}> ({releaseDate}) </span> 
                    </h3>
                    <p>{genre.join(", ")}</p>
                  </div>   
{/* Movie Watched Date */}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label htmlFor="dateWatched" className="label">Watched : </label>
                  </div>                  
                  <div className="field-body">
                    <div className="field">
                      <p className="control is-expanded has-icons-left">
                        <input
                          required
                          name="dateWatched"
                          className="input is-primary"
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
{/* Positive Movie Award Dropdown ---> htmlFor replaces the for attribute in React when you aren't wrapping the label around */}
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <label className="label has-text-centered" htmlFor="loved-award">
                      Loved It Award:
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
                      <option key={award.id} value={award.value} title={award.description}>
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
                      <option key={award.id} value={award.value} title={award.description}>
                          {award.icon} {award.label}
                      </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
{/* Would you watch again Radio buttons  */}              
<div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <label className="radio-label">
                      Would You Watch This Movie Again?
                      <div className="radio-group">
                        <label className="radio">
                          <RadioButton
                            name="watchAgain"
                            value="yes"
                            checked={watchAgain === 'yes'}
                            onChange={(e) => setWatchAgain(e.target.value)}
                          />
                          Yes
                        </label>
                        <label className="radio">
                          <RadioButton
                            name="watchAgain"
                            value="no"
                            checked={watchAgain === 'no'}
                            onChange={(e) => setWatchAgain(e.target.value)}
                          />
                          No
                        </label>
                      </div>
                    </label>
                  </div>
{/* Comments Text Box */}
                  <div>
                   <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <textarea
                            id="review-comments"
                            required
                            value={ review }
                            className="textarea is-success"
                            placeholder="Write your thoughts here ..."
                            rows="6"
                            onChange={(e) => setReview(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>                  
{/*  Spoiler Checkbox */}
                  <div className="inline-form" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <label className="checkbox" style={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox 
                        name="isSpoiler" 
                        checked={isSpoiler} 
                        onChange={(e) => setSpoiler(e.target.checked)} 
                      />
                      &nbsp; Does Review Contain Spoilers?
                    </label>
                  </div>               
{/* Passing the onTagsChange prop to InputTags Component, then the InputTags handleTagsChange executes  */}
                  <div>                    
                    <InputTags onTagsChange={updateTags} className="tag-input-container" />
                  </div>                  
                  <br />                 
                  {/* Just a bunch of divs to center the button, I can go in and do some css later for it */}     
                  <div className="field is-horizontal">
                    <div className="field-label"></div>
                    <div className="field-label"></div>
                    <div className="field-label"></div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                          <button className="button is-warning">Submit Review</button>
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
    movieId: PropTypes.number,
    title: PropTypes.string,
    releaseDate: PropTypes.string, 
    overview: PropTypes.string, 
    poster: PropTypes.string,
    genre: PropTypes.array
}
