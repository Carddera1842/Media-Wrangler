import React from "react";
import ReviewCard from "./ReviewCard";



export default function DisplayReview() {

//   TESTING MOVIE OBJECT: 
  const movie= {
    id: 2, 
    title: "Elf", 
    poster: "https://th.bing.com/th/id/R.4a6b29fcf1ab7cf3691f3bf7fcd2643e?rik=LWBs8HixZr5cUw&riu=http%3a%2f%2fwww.nerdspan.com%2fwp-content%2fuploads%2f2013%2f12%2felf-movie-poster.jpg&ehk=wNRWgnn0Hmn8ACJ8cWPtVRUO0bHZuqR4Bbqf9qaDPbs%3d&risl=&pid=ImgRaw&r=0", 
    releaseDate: "2003-11-07", 
    director: "Jon Favreau", 
    overview: "Raised as an oversized elf, Buddy travels from the North Pole to New York City to meet his biological father, Walter Hobbs, who doesn't know he exists and is in desperate need of some Christmas spirit.",
    genre: ["Comedy", "Adventure", "Family", "Fantasy", "Romance" ],

    username: "username here",
    review: "Elf is a heartwarming and hilarious holiday classic! Will Ferrell’s performance as Buddy the Elf is nothing short of iconic – his enthusiasm and childlike wonder bring so much joy to the screen. The humor is perfectly balanced with heartfelt moments, making it a great watch for the whole family. The festive soundtrack and vibrant colors really set the mood for a cheerful Christmas spirit. While the plot is predictable, the execution is flawless, making it a holiday favorite year after year. Highly recommended for anyone looking for a good laugh and some holiday cheer!",
    rating: "⭐⭐⭐⭐⭐",
    isSpoiler: false,
    dateWatched: "12-25-24",
    watchAgain: "yes",
    award: {
        value: "Wrangler Roundup Winner",
        icon: "🤠"
    },
    isLiked: true,
    tags: ['Rewatchable', 'Syrup on Spaghetti', 'Christmas Cheer']
}

const spoilerMovie= {
    id: 3, 
    title: "Movies with longer titles look like this", 
    poster: "https://th.bing.com/th/id/R.4a6b29fcf1ab7cf3691f3bf7fcd2643e?rik=LWBs8HixZr5cUw&riu=http%3a%2f%2fwww.nerdspan.com%2fwp-content%2fuploads%2f2013%2f12%2felf-movie-poster.jpg&ehk=wNRWgnn0Hmn8ACJ8cWPtVRUO0bHZuqR4Bbqf9qaDPbs%3d&risl=&pid=ImgRaw&r=0", 
    releaseDate: "2003-11-07", 
    director: "Jon Favreau", 
    overview: "Raised as an oversized elf, Buddy travels from the North Pole to New York City to meet his biological father, Walter Hobbs, who doesn't know he exists and is in desperate need of some Christmas spirit.",
    genre: ["Comedy", "Adventure", "Family", "Fantasy", "Romance" ],

    username: "username here",
    review: "Elf is a heartwarming and hilarious holiday classic! Will Ferrell’s performance as Buddy the Elf is nothing short of iconic – his enthusiasm and childlike wonder bring so much joy to the screen. The humor is perfectly balanced with heartfelt moments, making it a great watch for the whole family. The festive soundtrack and vibrant colors really set the mood for a cheerful Christmas spirit. While the plot is predictable, the execution is flawless, making it a holiday favorite year after year. Highly recommended for anyone looking for a good laugh and some holiday cheer!",
    rating: "⭐⭐",
    isSpoiler: true,
    dateWatched: "12-25-24",
    watchAgain: "yes",
    award: {
        value: "Busted Bronco",
        icon: "🐎"
    },
    isLiked: false,
    tags: ['Singing Out Loud', 'Holiday Cheer', 'Santa']
}

return (
    <>
{/* 
 Testing with demo data */}
        
        <ReviewCard
            key={ movie.id }
            movieId={ movie.id }
            title={ movie.title}
            poster={ movie.poster }
            releaseDate={ movie.releaseDate }
            genre={ movie.genre }

            username={ movie.username }
            review={ movie.review }
            rating={ movie.rating }
            isSpoiler={ movie.isSpoiler }
            dateWatched={ movie.dateWatched }
            watchAgain={ movie.watchAgain }
            awardValue={ movie.award.value }
            awardIcon={ movie.award.icon }
            isLiked={ movie.isLiked }  
            tags={ movie.tags }          
        />
           <ReviewCard
            key={ spoilerMovie.id }
            movieId={ spoilerMovie.id }
            title={ spoilerMovie.title }
            poster={ spoilerMovie.poster }
            releaseDate={ spoilerMovie.releaseDate }
            genre={ spoilerMovie.genre }

            username={ spoilerMovie.username }
            review={ spoilerMovie.review }
            rating={ spoilerMovie.rating }
            isSpoiler={ spoilerMovie.isSpoiler }
            dateWatched={ spoilerMovie.dateWatched }
            watchAgain={ spoilerMovie.watchAgain }
            awardValue={ spoilerMovie.award.value }
            awardIcon={ spoilerMovie.award.icon }
            isLiked={ spoilerMovie.isLiked }
            tags={ spoilerMovie.tags }            
        /> 




       
    </>
);
}


