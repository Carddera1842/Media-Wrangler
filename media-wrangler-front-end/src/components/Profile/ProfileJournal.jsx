import React, { useEffect, useState } from 'react';
import { fetchMovieReviewsByUser } from '../../Services/MovieReviewService';
import { useNavigate, useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';



function UserJournalPage() {

    const { userId } = useParams();
    const [reviews, setReviews] = useState(null);
    const [loading, setLoading] = useState(true);
   
    const navigate = useNavigate();

    //This is going to fetch the users reviewData
    useEffect(() => {
        async function fetchData() {
            const data = await fetchMovieReviewsByUser(userId);
            setReviews(data);
            setLoading(false);
        };
        fetchData();
    }, [userId]);



    if (loading) return <p>Loading reviews...</p>;


    //Styling declared for the table
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#3e2723", 
            color: theme.palette.common.white,
            textAlign: 'center',
            fontFamily: "'Roboto Slab', serif", 
            fontWeight: 'bold',
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            color: "#fff3e0", 
            textAlign: 'center',
            fontFamily: "'Roboto Slab', serif",
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: "#5d4037", 
        },
        '&:nth-of-type(even)': {
            backgroundColor: "#4e342e", 
        },
    }));
    

    return (
        <>
        <div>            
            <Paper 
            elevation={0} 
            sx={{
                maxWidth: 1100,
                background: "#3e2723", 
                margin: "30px auto",
                padding: "20px",
                border: "5px solid #ff8f00", 
                borderRadius: "12px",
                fontFamily: "'Roboto Slab', serif",
                color: "#fff3e0", 
            }}
        >
            <TableContainer >
                <Table sx={{ maxWidth: 1200, margin: "30px auto" }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date Watched</StyledTableCell>
                            <StyledTableCell align="right">Movie Poster</StyledTableCell>
                            <StyledTableCell align="right">Title</StyledTableCell>
                            <StyledTableCell align="right">Year Released</StyledTableCell>
                            <StyledTableCell align="right">Rating</StyledTableCell>
                            <StyledTableCell align="right">Rewatchable</StyledTableCell>
                            <StyledTableCell align="right">Update</StyledTableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviews.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">No journal started yet, please write a review to make an entry...</TableCell>
                            </TableRow>
                        ) : (
                            reviews.map((review) => (
                                <StyledTableRow key={review.id}>
                                    <StyledTableCell component="th" scope="row">
                                        <EventNoteTwoToneIcon align="center" fontSize='large' /><br />
                                        {review.dateWatched} 
                                    </StyledTableCell>                                    
                                    <StyledTableCell align="right">
                                        <img src={review.fullPosterURL} alt={review.title} style={{ width: 100, height: 85}} />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                    <span
                                        onClick={() => navigate(`/reviews/view/${review.id}`)}
                                        style={{
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: "22px",
                                            cursor: "pointer",
                                            textDecoration: "underline",
                                            textDecorationThickness: "1px",
                                            textDecorationColor: "#ff8f00", 
                                            textUnderlineOffset: "3px",
                                        }}
                                    >
                                        {review.title}
                                    </span>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{review.yearReleased}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Rating name="read-only" value={ review.ratingValue } readOnly /> 
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        { review.watchAgain }
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button>Edit</Button> 
                                        <Button color="error">Delete</Button>
                                    </StyledTableCell>                                    
                                </StyledTableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper> 
            </div>
        </>
    );
};

export default UserJournalPage;

//TODO: I need to reformat the date for dateWatched --- and dateReleased as well. 