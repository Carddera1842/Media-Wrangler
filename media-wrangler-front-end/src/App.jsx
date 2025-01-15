import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import ReviewForm from './components/ReviewForm/ReviewForm'
import Navbar from './components/nav/Navbar'
import Movies from './components/Movies/Movies'
import Search from './components/Search/Search'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import LoginSuccess from './components/Login/LoginSuccess'
import Register from './components/Register/Register'
import registrationSuccess from './components/Register/RegistrationSuccess'
import MovieSearch from './components/MovieSearch'
import CreateReview from './components/ReviewForm/CreateReview'
import DisplayReview from './components/ReviewDisplay/DisplayReview'
import JournalDisplayReview from './components/ReviewDisplay/JournalDisplayReview';
import MovieReviewListCard from './components/ReviewDisplay/MovieReviewListCard'

function App() {



  return (
    <>
      <Navbar />
        <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/search" element={<MovieSearch />}/>
        <Route path="/loginsuccess" element={<LoginSuccess />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/registrationsuccess" element={<registrationSuccess />}/>
        <Route path="/reviews/create" element={<CreateReview />} />           {/* This is to demonstrate different form versions */}   
        <Route path="/reviews/view" element={<DisplayReview />}/>             {/* User is redirected here to see review they just submitted */}
        <Route path="/reviews/view/:id" element={<JournalDisplayReview />} /> {/* This displays a review by id */}
        <Route path="/reviews/movie" element={<MovieReviewListCard />} />     {/* This displays what reviews may look like on movie detail page */}
      </Routes>
        </div>
    </>
  )
}

export default App
