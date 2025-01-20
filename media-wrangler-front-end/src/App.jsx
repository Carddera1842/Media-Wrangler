import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import Movies from './components/Movies/Movies'
import Search from './components/Search/Search'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import LoginSuccess from './components/Login/LoginSuccess'
import Register from './components/Register/Register'
import MovieSearch from './components/Search/MovieSearch'
import Profile from './components/Profile/Profile'
import { PrivateRoutes } from './Services/PrivateRoutes'
import CreateReview from './components/ReviewForm/CreateReview';
import JournalDisplayReview from './components/ReviewDisplay/JournalDisplayReview';
import MovieDetailsPage from './components/MovieDetails/MovieDetailsPage'
import UserJournalPage from './components/Journal/UserJournalPage'

function App() {


  return (
    <>
      <Navbar />
        <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />}/>             {/* There is nothing on this page anymore, could be removed */}        
        <Route path="/search" element={<Search />}/>
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="/login" element={<Login />}/>
        {/* <Route element={<PrivateRoutes />}> */}
          <Route path="/profile/:userId" element={<Profile />}/>
        {/* </Route> */}
        <Route path="/register" element={<Register />}/>
        <Route path="/reviews/create" element={<CreateReview />} />             
        <Route path="/reviews/user/:userId" element={<UserJournalPage />}/>             {/* User is redirected to UserJournalPage*/}
        <Route path="/reviews/view/:id" element={<JournalDisplayReview />} />           {/* This displays a review by id */}
      </Routes>
        </div>
    </>
  )
}

export default App

/*TODO: the reviews/view/id to display JournalReview no longer is working. I probably need to update the code now that 
        I have more moving parts...
        Can probably use this for the users journal. Could have dateWatched, movie poster and movie title that is clickable. When user clicks on one it directs them to the view of that particular one


*/




 
