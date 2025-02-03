import React from 'react'
import { deleteReview } from '../../Services/MovieReviewService';
import { Card, CardContent, Typography, CardActions, Button, Divider, Stack, Paper, Box } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import "../../stylings/JournalDisplayReview.css";
import PropType from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AvatarHeader from '../Profile/AvatarHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';

export default function JournalReviewCard({ title, fullPosterURL, watchAgain, tags, rating, isSpoiler, review, dateWatched, award, yearReleased, username, lastname, firstname, userId }) {

    const navigate = useNavigate();
    const { id } = useParams();

    function handleEditClick() {
        navigate(`/reviews/edit/${id}`);
    };
    
    return (
        <>
         
            <Paper
                elevation={0}
                sx={{
                    maxWidth: 1200,
                    background: "rgba(80, 15, 41, 0.84)",
                    margin: "30px auto",
                    padding: "20px",
                    borderRadius: "14px",
                    transform: "scale(.9)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                        transform: "scale(1)",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
                    }
                }} >
                <div className="user-review-container">
                    <Card sx={{ border: "4px solid rgb(176, 140, 161)", borderRadius: "14px", background:"rgba(19, 19, 20, 0.81)" }} variant="outlined">
                        <div className="movie-info-container">
                            <div>
                                <Typography variant="h5" component="div" className="username" color="text.secondary">
                                    <AvatarHeader
                                    firstname = { firstname }
                                    lastname = { lastname }
                                    />
                                    <span
                                        onClick={() => navigate(`/profile/${userId}`)}
                                        style={{
                                            color: "rgb(176, 140, 161)",
                                            fontWeight: "bold",
                                            fontSize: "35px",
                                            cursor: "pointer",
                                            textDecoration: "underline",
                                            textDecorationThickness: "1px",
                                            textDecorationColor: "#ff8f00",
                                            textUnderlineOffset: "3px",
                                        }}
                                    >
                                        { username }
                                    </span>
                                </Typography>
                                <Typography variant="h5" component="div" className="username" color="text.secondary">  
                                    <div>
                                        <img style={{height: "300px", width: "auto", margin: "10px"}} src={ fullPosterURL } alt="movie poster" />
                                    </div>
                                </Typography>
                                <div style={{ textAlign: "center" }}>
                                    <Rating name="read-only" value={ rating } readOnly />
                                    <Typography className="spoiler-alert" >
                                        {(isSpoiler && <Typography className="spoiler-alert"><PriorityHighIcon />Contains Spoilers </Typography>)}
                                    </Typography>
                                </div>
                            </div>
                            <CardContent className="user-review">
                                <Typography sx={{ color: "white" }}variant="h4" component="div">
                                    { title }
                                    <span style={{ fontSize: '1.5rem', margin: '0', color: "#ff8f00", fontWeight: '100' }}> ({ yearReleased }) </span>
                                    <hr style={{ background: "rgb(255, 0, 144)" }} />
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'rgb(176, 140, 161)', textAlign: 'center', fontSize: '22px' }}>
                                    You Presented { title } with the <span style={{ color: "rgb(179, 68, 131)" }}><b> "{award}" </b></span> Award
                                </Typography>
                                <br />
                                <Typography variant="body1" sx={{ color: 'white' }}  >
                                    { review }
                                </Typography>
                                <br />
                                <br />
                                <Typography sx={{ color: "rgb(179, 68, 131)" }}>
                                    <b>Your Tags:</b>
                                </Typography>
                                <Stack
                                    direction="row"
                                    divider={<Divider orientation="vertical" flexItem sx={{borderWidth: 1, borderColor: "rgb(255, 0, 144)" }} />}
                                    spacing={2}
                                >
                                    { tags.map((tag, index) => (
                                        <div key={tag.id}>
                                            <Typography variant="body2" sx={{ color: 'rgb(176, 140, 161)'}}>{ tag }
                                            </Typography>
                                        </div>))}
                                </Stack>
                                <br />
                               
                            <br />
                            <Typography variant='body2' sx={{ color: "white" }}>
                                    Watched on { dateWatched }
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography variant='body2' sx={{ color: 'white'}}>
                                        Would You Watch Again?
                                    </Typography>
                                    {(watchAgain === "yes" ? <CheckCircleIcon sx={{fontSize: "25px", color: "blue", marginLeft: "5px"}} /> :                        <CancelIcon sx={{fontSize: "25px", color: "red", marginLeft: "5px"}} />  )}
                                </Box>
                            </CardContent>    
                            </div>                                                
                            <CardActions>
                            <Button
                                size="small"
                                onClick={ handleEditClick }>Edit Review</Button>
                        </CardActions>                      
                    </Card>
                </div>
            </Paper>
           
        </>
    );
}


JournalReviewCard.propTypes = {
    title: PropType.string, 
    poster: PropType.string, 
    watchAgain: PropType.string, 
    tags: PropType.array, 
    rating: PropType.number,    
    isSpoiler: PropType.bool, 
    review: PropType.string, 
    dateWatched: PropType.string, 
    award: PropType.string, 
    yearReleased: PropType.string,
    fullPosterURL: PropType.string,
    userId: PropTypes.number,
    username: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string
}