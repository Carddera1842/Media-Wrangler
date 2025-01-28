import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Button, CardActions, Avatar, Paper, Divider, TextField } from '@mui/material';

import { useAuth } from '../../Services/AuthContext';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import AvatarHeader from '../Profile/AvatarHeader';
import { submitUserComment, fetchCommentsByMovieReviewId } from '../../Services/CommentService'

const MovieReviewListCard = ({ rating, award, review, authorId, username, firstname, lastname, title, movieReviewId }) => {

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
      console.log("here is the data from the fetchComments", data);
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

    console.log("Submitting user comment for:", userCommentData);
    console.log("user that's being logged: ", userCommentData.userId);
    console.log("this comes after the userCommentData", userCommentData.movieReviewId);
    console.log("this is the username: ", username);
    
  
  

    try {
      const responseMessage = await submitUserComment(userCommentData); 

      if (responseMessage === "Success") {
        console.log("Comment saved successfully!");

        const newComment = {
          id: Date.now(),
          username: user.username,
          userComment
        };

        //adding the newComment to the arrayList by using spreader on the most updated state of userComments
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
      <Card sx={{ maxWidth: 1200, marginBottom: 2, border: "3px solid rgba(5, 70, 105, 0.93)", background: "rgba(19, 19, 20, 0.81)" }}>
        <CardContent>     
          <div className="avatar-username-rating-container ">     
            <AvatarHeader 
              firstname = { firstname }
              lastname = { lastname }
            />
            <div className='username-profile-link'>                       
              <span onClick={() => navigate(`/profile/${authorId}`)} > { username } </span>
            </div>            
            <Rating name="read-only" value={ rating } readOnly />
          </div>       
          <Divider sx={{
                      marginBottom: "20px",
                      backgroundColor: "white", 
                      height: "2px", 
                    }}/>
          <Typography sx={{color: "white"}}>
            { username } Presented { title } with the <span style={{ color: "rgba(249, 79, 0, 0.55)", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>
             " {award} "</span> Award 
          </Typography>
          <br />                          
          <Typography variant="body2" color="white" > { review } </Typography>
        </CardContent>



{/*  Okay, so I got the mapping to work, but I want to may a better display for the comments */}

         <div className="comments-section">
    {userComments.length === 0 ? (
      <Typography margin="20px" color="white">No comments yet.</Typography>
    ) : (
      userComments.map((comment) => (
        <div key={comment.id} className="comment-card">
          <Typography variant="body2" color="white">
            <b>{comment.username}</b>: {comment.userComment}
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
                      color: "white", // Text color inside the input
                    },
                    "& .MuiInputLabel-root": {
                      color: "white", // Label color
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white", // Border color
                    },
                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ff8f00", // Border color on hover
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


