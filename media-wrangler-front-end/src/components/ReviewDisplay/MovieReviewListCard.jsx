import React, { useState } from 'react'
import { Card, CardContent, Typography, Button, CardActions, Avatar, Paper, Divider, TextField } from '@mui/material';
import "../ReviewDisplay/JournalReviewCard.css";
import submitUserComment from "../../Services/CommentService";
import { useAuth } from '../../Services/AuthContext';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import AvatarHeader from '../Profile/AvatarHeader';
import { fontSize } from '@mui/system';




const MovieReviewListCard = ({ rating, award, review, userId, username, firstname, lastname }) => {

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [userComments, setUserComments] = useState([]);
  const [error, setError] = useState('');


  const { user } = useAuth();
  const navigate = useNavigate();



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
      alert("You must be logged in to write a review");
      navigate('/login');
  }
   
    if(!userComment) {   
      alert("You must write a comment or press cancel");
      return;
    }
     

    //TODO: Add in review once the cards are dynamic
    const userCommentData = { 
      userComment,
      user
    }


    
    console.log("Submitting user comment for:", userCommentData);
  

    try {
      const responseMessage = await submitUserComment(userCommentData); 

      if (responseMessage === "Success") {
        console.log("Comment saved successfully!")
      

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
    <div className='searched-movie-review-list'>  
      <Paper
        elevation={0}
        sx={{
            maxWidth: 1100,
            background: "#004d40",
            padding: "10px",
            margin: "10px auto",        
        }} >
      <Card sx={{ maxWidth: 1200, marginBottom: 2, border: "3px solid #ff8f00" }}>
        <CardContent>
          <Typography variant="h5" component="div" className="username" color="text.secondary">
            <AvatarHeader 
              firstname = { firstname }
              lastname = { lastname }
            />                       
            <span
                onClick={() => navigate(`/profile/${userId}`)}
                style={{
                    color: "#004d40",
                    fontWeight: "bold",
                    fontSize: "22px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    textDecorationThickness: "1px",
                    textDecorationColor: "#ff8f00", 
                    textUnderlineOffset: "3px",
                }}
            >
                { username }
            </span>            
              <Rating name="read-only" value={ rating } readOnly />         
          </Typography> 
          <Divider sx={{ marginBottom: "20px"}}/>
          <Typography>
            User Presented the Movie with <span style={{ color: "black", fontSize: "20px", fontWeight: "bold", margin: "5px" }}>
              {award}</span> Award 
          </Typography>
          <br />                          
          <Typography variant="body2" color="text.primary" > { review } </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" >Like</Button>
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
              sx={{ marginBottom: 2 }}
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


