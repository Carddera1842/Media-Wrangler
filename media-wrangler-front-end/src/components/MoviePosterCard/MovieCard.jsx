import React, { useState } from 'react';
import './MovieCard.css';


function MovieCard() {

 


    //Testing the map() function -- will use demo data until search filters or user movie lists are available
    const movies = [
        {id: 1, 
            title: "It's a Wonderful Life",
            poster: "https://image.tmdb.org/t/p/original/qRitcyVpWdL7bSV7akDcKTR2YxL.jpg"   
        },
        {id: 2, 
            title: "Elf", 
            poster: "https://th.bing.com/th/id/R.4a6b29fcf1ab7cf3691f3bf7fcd2643e?rik=LWBs8HixZr5cUw&riu=http%3a%2f%2fwww.nerdspan.com%2fwp-content%2fuploads%2f2013%2f12%2felf-movie-poster.jpg&ehk=wNRWgnn0Hmn8ACJ8cWPtVRUO0bHZuqR4Bbqf9qaDPbs%3d&risl=&pid=ImgRaw&r=0" 
        },
        {id: 3, 
            title: "National Lampoon's Christmas Vacation",
            poster: "https://th.bing.com/th/id/R.125ac48e9aa9e14ae04cef81ec106f33?rik=TtGyrHK5QucY7A&riu=http%3a%2f%2fstatic1.squarespace.com%2fstatic%2f57488e28746fb940f103c64e%2f574f321fb09f95f3b30449b5%2f5bd0f04124a69482aaa57017%2f1545267192036%2fChristmas%2bVacation%2bPoster.jpg%3fformat%3d1500w&ehk=SAHawDiZJirI61qbNe1xvB%2f3Zoccx2tDprTPyAdwbrY%3d&risl=&pid=ImgRaw&r=0"
        }
    ]

    //This should track which movie id is being hovered over. isHovered state variable was allowing all movies to highlight at once
    const [hoveredId, setHoveredId] = useState(null); 

  function handleMouseOver(id) {
    setHoveredId(id); 
  }

  function handleMouseOut() {
    setHoveredId(null); 
  }

  function handleClick() {
    console.log("Poster Clicked");
  }


    return(
        <div>
        <div id="movie-search">
            {movies.map((movie) => (
            <div key={movie.id}>
                <img
                onClick={handleClick}
                onMouseOver= {() => handleMouseOver(movie.id)}
                onMouseOut={handleMouseOut}
                src={movie.poster} 
                alt={movie.title} 
                style={{
                    border: hoveredId === movie.id ? '2px solid rgb(99, 180, 176)' : 'none', 
                    transition: 'border 0.3s ease', 
                  }}
                />
                
            {/* Picked up the highlight styling from googling it. It can be changed to whatever we want.
                Also, the poster onClick event does work. Now I'll just need to reroute it to the movie detail view */}
           
                
            </div>
            ))}
            </div>
        </div>

     
    );
}

export default MovieCard;







