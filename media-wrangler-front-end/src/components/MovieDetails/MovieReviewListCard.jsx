import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Button, CardActions, Paper, Divider, TextField } from '@mui/material';
import { useAuth } from '../../Services/AuthContext';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import AvatarHeader from '../Profile/AvatarHeader';
import { submitUserComment, fetchCommentsByMovieReviewId } from '../../Services/CommentService';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import PropTypes from 'prop-types';


const MovieReviewListCard = ({ rating, award, review, username, firstname, lastname, title, movieReviewId, dateWatched, isSpoiler }) => {

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [userComments, setUserComments] = useState([]);
  const [error, setError] = useState('');
 
  const { user } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchComments() {
      const data = await fetchCommentsByMovieReviewId(movieReviewId);  
      setUserComments(data);  
    }
  
    fetchComments();
  }, [movieReviewId]);  



  function handleCommentClick() {
    setShowCommentBox(prev => !prev);
  };

  function handleCommentChange(event) {
    setUserComment(event.target.value);
  };

  function handleCancelComment() {
    setUserComment('');
    setShowCommentBox(false);
  }



  async function handleSaveComment(e) {
    e.preventDefault();

    if(!user) {
      alert("You must be logged in to write a comment");
      navigate('/login');
    }
   
    if(!userComment) {   
      alert("You must write a comment or press cancel");
      return;
    }
    
    const userId = user.id;

    const userCommentData = { 
      userComment,
      userId,
      movieReviewId, 
      username     
    }
  
  
    try {
      const responseMessage = await submitUserComment(userCommentData); 

      if (responseMessage === "Success") {
        console.log("Comment saved successfully!");

        const newComment = {
          id: Date.now(),
          username: user.username,
          userComment
        };

        setUserComments((prevComments) => [...prevComments, newComment])

      } else {
        setError(responseMessage);
      }
      
    } catch (error) {
        console.error("Unexpected error during movie review submission: ", error);
        setError({error: "An unexpected error occurred. Please try again"});

    } finally {
      setUserComment('');
      setShowCommentBox(false); 
    }
  };

  const formattedDate = new Date(dateWatched).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  return (
    <div>  
      <Paper
        elevation={0}
        sx={{
            maxWidth: 1100,
            background: "rgba(249, 79, 0, 0.55)",
            padding: "10px",
            margin: "20px auto",        
        }} >
        <Card sx={{ maxWidth: 1200, marginBottom: 2, border: "3px solid rgba(17, 144, 213, 0.93)", background: "rgba(19, 19, 20, 0.81)" }}>
          <CardContent>     
            <div className="avatar-username-rating-container ">     
              <AvatarHeader 
                firstname = { firstname }
                lastname = { lastname }
              />
              <div className='username-profile-link'>                       
                { username } 
              </div>            
              <Rating name="read-only" value={ rating } readOnly />
            </div>       
            <Divider sx={{
                        marginBottom: "20px",
                        backgroundColor: "white", 
                        height: "1px", 
                      }}/>
            <div className='movie-review-info'>
              <Typography sx={{ textAlign: "center"}}>
                Presented { title } with the <span style={{ color: "rgba(249, 79, 0, 0.55)", fontSize: "20px", fontWeight: "bold", margin: "5px" }}> "{award}" </span> Award 
              </Typography>            
              <Typography >                                                  
              {(isSpoiler && <Typography className="spoiler-alert"><PriorityHighIcon />Contains Spoilers </Typography>)} </Typography>
              <Typography variant="body2">Watched on { formattedDate }</Typography>
              <br /> 
              <br />                         
              <Typography variant="body1"> { review } </Typography>
            </div>      
          </CardContent>
          <Divider sx={{
                        margin: "15px",
                        backgroundColor: "white", 
                        height: "1px", 
                      }}/>
          <div className="comments-section">
            <Typography variant="body2">User Comments :</Typography>
            <br />
            {userComments.length === 0 ? (
            <Typography variant="body2">No comments. Be the first to comment...</Typography>
            ) : (
              userComments.map((comment) => (
                <div key={comment.id} className="comment-card">
                  <Typography variant="body2">
                    <span style={{color: "rgba(249, 79, 0, 0.55)", fontSize: "20px"}}><b>{comment.username}</b></span> : {comment.userComment}
                  </Typography>
                </div>
              ))
            )}
          </div> 

          <CardActions>
            <Button size="small" onClick={handleCommentClick} >Comment</Button>
          </CardActions>
          {showCommentBox && (
            <CardContent>
              <TextField
                label="Write a comment"
                fullWidth
                multiline
                value={userComment}
                onChange={handleCommentChange}
                sx={{ marginBottom: 2,
                      "& .MuiInputBase-root": {
                        color: "white", 
                      },
                      "& .MuiInputLabel-root": {
                        color: "white", 
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white", 
                      },
                      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff8f00", 
                      }, }}
              />            
              <Button size="small" onClick={handleSaveComment}>Save</Button>
              <Button size="small" onClick={handleCancelComment} >Cancel </Button>
            </CardContent>
          )}
        </Card>
      </Paper>
    </div>
  )
}


export default MovieReviewListCard;

MovieReviewListCard.propTypes = {
  movieReviewId: PropTypes.number,
  title: PropTypes.string,
  rating: PropTypes.number,  
  award: PropTypes.string,
  review: PropTypes.string,
  authorId: PropTypes.number,
  username: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  dateWatched: PropTypes.string,
  isSpoiler: PropTypes.bool
}
