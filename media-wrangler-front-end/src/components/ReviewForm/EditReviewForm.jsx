import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputTags from "../InteractiveSoloComponents/InputTags";
import { Checkbox, Paper, useStepContext } from "@mui/material";
import RadioButton from '../InteractiveSoloComponents/RadioButton';
import AwardEnum from "../enums/AwardEnum";
import Rating from '@mui/material/Rating';

function EditReviewForm() {

    const navigate = useNavigate();
    const location = useLocation();
    const { review } = location.state || {}; 
    
    
    const [updatedReview, setUpdatedReview] = useState({
      award: review.award || '', 
      dateWatched: review.dateWatched || '',
      isSpoiler: review.isSpoiler || false,
      ratingValue: review.ratingValue || 0,
      review: review.review || '',
      tags: review.tags || [],
      watchAgain: review.watchAgain || '',
      fullPosterURL: review.fullPosterURL || '',
      title: review.title || '',
      yearReleased: review.yearReleased || '',
  });
    
    
  useEffect(() => {
    if (review) {
     setUpdatedReview({
        award: review.award,
        dateWatched: review.dateWatched,
        isSpoiler: review.isSpoiler,
        ratingValue: review.ratingValue,
        review: review.review,
        tags: review.tags,
        watchAgain: review.watchAgain,
        fullPosterURL: review.fullPosterURL,
        title: review.title,
        yearReleased: review.yearReleased,   
    });
  }  else {
    navigate('/');
    return;
  } 
}, [review, navigate]);


  function handleSubmit() {
    console.log("clicked submit");
  }



  return (
    <div>
       <>       
        <div className="paper-container">
          <Paper 
            elevation={0} 
            sx={{
                maxWidth: 1000, 
                background: "#004d40", 
                margin: "30px", 
                padding: "20px", 
                transform: "scale(.9)", 
                transition: "transform 0.3s, box-shadow 0.3s", 
                "&:hover": {
                    transform: "scale(1.1)", 
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" 
                }
            }} >
            <div className="review-container">
              <div className="poster">
              <div className="form-header">
                      <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>
                       <b>{ updatedReview.title }</b> <span style={{ fontSize: '19px', margin: '0', color: "#ff8f00", fontWeight: '100' }}> ({ updatedReview.yearReleased }) </span> 
                      </h3>
                    </div> 
                <img src={ updatedReview.fullPosterURL } ></img>
              </div>
              <form onSubmit={ handleSubmit }>              
                  <div className="review-form">
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
                              value={ updatedReview.dateWatched }
                              onChange={ (e) => setDateWatched(e.target.value) }
                            />
                            <span className="icon is-small is-left">
                              <i className="fas fa-user"></i>
                            </span>
                          </p>
                        </div>
                        <div className="field-label"></div>
                        <div className="field">
                          <div className="field-label is-normal">
                          <Rating
                              required
                              name="half-rating" 
                              value={ updatedReview.ratingValue }
                              precision={0.5} 
                              onChange={ handleRatingChange }
                              sx={{
                                  '& .MuiRating-iconFilled': {
                                      color: '#ff9800',
                                  },
                                  '& .MuiRating-iconEmpty': {
                                      color: '#e0e0e0',
                                  },
                                  '& .MuiRating-iconHover': {
                                      color: '#ffcc00',
                                  },
                              }}
                          />
                          </div>                        
                        </div>
                      </div>
                    </div>                             
                    <div className="field is-grouped is-grouped-centered">
                      <div className="control">
                        <label className="label has-text-centered" htmlFor="loved-award">
                          Loved It Award:
                        </label>
                        <div className="select is-warning">
                          <select
                            id="loved-award"
                            name="loved-award"
                            value={ lovedAward }
                            onChange={ handleLovedAward }
                            disabled={ isLovedDisabled }
                          >
                           
                            <option value="">-- Select an Award --</option>
                            { lovedAwards.map((award) => (
                            <option key={ award.id } value={ award.value } title={ award.description }>
                                { award.icon } { award.label }
                            </option>
                            ))}
                           
                          </select>
                        </div>
                      </div>
                      <button className="is-centered"
                        type="button"
                        title="Click here to reset the awards"
                        onClick={ resetAwards }
                      >
                        <br /><span style={{color: "white"}}>RESET</span>
                        <br /><span style={{fontSize: "25px"}}>🆚</span>
                      </button>                    
                      <div className="control">
                        <label className="label has-text-centered" htmlFor="hated-award">
                          Hated It Award:
                        </label>
                        <div className="select is-warning">
                          <select
                            id="hated-award"
                            name="hated-award"
                            value={ hatedAward }
                            onChange={ handleHatedAward }
                            disabled={ isHatedDisabled }
                          >
                            <option value="">-- Select an Award --</option>
                            { hatedAwards.map((award) => (
                            <option key={ award.id } value={ award.value } title={ award.description }>
                                { award.icon } { award.label }
                            </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>           
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      <label className="radio-label">
                        Would You Watch This Movie Again?
                        <div className="radio-group">
                          <label className="radio">
                            <RadioButton
                              name="watchAgain"
                              value="yes"
                              checked={ watchAgain === 'yes' }
                              onChange={ (e) => setWatchAgain(e.target.value) }
                            />
                              Yes
                          </label>
                          <label className="radio">
                            <RadioButton
                              name="watchAgain"
                              value="no"
                              checked={ watchAgain === 'no' }
                              onChange={ (e) => setWatchAgain(e.target.value) }
                            />
                              No
                          </label>
                        </div>
                      </label>
                    </div>
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
                              rows="4"
                              onChange={ (e) => setReview(e.target.value) }
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>                  
                    <div className="inline-form" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                      <label className="checkbox" style={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox 
                          name="isSpoiler" 
                          checked={ isSpoiler } 
                          onChange={ (e) => setSpoiler(e.target.checked) } 
                        />
                          &nbsp; Does Review Contain Spoilers?
                      </label>
                    </div>               
                    <div>                    
                      <InputTags onChange={ updateTags } />
                    </div>                  
                    <br />               
                    <div className="field is-horizontal">                     
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
              </Paper>  
            </div> 
        </>
    </div>
  )
}

export default EditReviewForm
