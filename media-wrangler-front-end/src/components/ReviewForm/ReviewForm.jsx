import { useState } from "react";
import React from "react";

import 'bulma/css/bulma.min.css';
import './ReviewForm.css';


function ReviewForm() {


  const [dateWatched, setDateWatched] = useState("");
  const [review, setReview] = useState('');
  const [spoiler, setSpoiler] = useState('no');
  const [movieMVP, setMovieMVP] = useState(''); 
  

  const handleSubmit = (e) => {
      e.preventDefault();
      const movieReview = { dateWatched, review, spoiler, movieMVP }

      console.log(movieReview);
  }
  
    return (
        <>
          <div className="review-container">

{/* Movie Poster Image */}
            <div className="poster">
              <img src="https://image.tmdb.org/t/p/original/qRitcyVpWdL7bSV7akDcKTR2YxL.jpg" ></img>
            </div>

{/* Movie Review Form */}
            <form onSubmit={handleSubmit}>
              <div className="review-form">
                <div className="content is-normal">
                  <h1>Movie Title Goes Here (YEAR)</h1>
                  <h5>Movie Genre Goes Here</h5>
                </div>
            
                <br />

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
{/* Left this blank for spacing...otherwise the date bar spans all the way across -- can fix later */}
                      </div>                        
                    </div>
                  </div>
                </div>

                <br />

{/* NOTE: Could add another Drop down that is for "room for improvement", "missed the mark" or "underwhelming" for when a user didn't favor the movie. OR.... Could add a negative drop down option for the user to pick. Maybe some funny awards for sucking or something--- "what did I just watch?", "Best effort, worst execution", "Most likely to be forgotten", etc .... we can also maybe try to incorporate some funny western/cowboy humor for some of the fields. I did not make it required because I am not even sure if it is asking user too much for the review  */}

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
                      value={ spoiler }
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
                        <input className="input is-danger" type="text" placeholder="tag name here ..." />
                      </div>
                    </div>
                  </div>
                </div>

                <br />

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
