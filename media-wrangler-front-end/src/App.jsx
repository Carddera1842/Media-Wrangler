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
import DisplayReview from './components/ReviewDisplay/DisplayReview';
import JournalDisplayReview from './components/ReviewDisplay/JournalDisplayReview';
import MovieReviewListCard from './components/ReviewDisplay/MovieReviewListCard';

function App() {


  return (
    <>
      <Navbar />
        <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />}/>
        
        <Route path="/search" element={<Search />}/>
        <Route path="/login" element={<Login />}/>
        {/* <Route element={<PrivateRoutes />}> */}
          <Route path="/profile/:userId" element={<Profile />}/>
        {/* </Route> */}
        <Route path="/register" element={<Register />}/>
        <Route path="/reviews/create" element={<CreateReview />} />             
        <Route path="/reviews/view" element={<DisplayReview />}/>             {/* User is redirected to message of success, should probably redirect to the user's journal or profile in the future*/}
        <Route path="/reviews/view/:id" element={<JournalDisplayReview />} /> {/* This displays a review by id */}
      </Routes>
        </div>
    </>
  )
}

export default App








 
