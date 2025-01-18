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
import CreateReview from './components/ReviewForm/CreateReview'
import DisplayReview from './components/ReviewDisplay/DisplayReview'
import JournalDisplayReview from './components/ReviewDisplay/JournalDisplayReview'
import MovieReviewListCard from './components/ReviewDisplay/MovieReviewListCard'

import { AuthProvider } from './Services/AuthContext';
import { ListProvider } from './Services/ListContext.jsx'

function App() {
  return (
    <AuthProvider>
    <ListProvider>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reviews/create" element={<CreateReview />} />
          <Route path="/reviews/view" element={<DisplayReview />} />
          <Route path="/reviews/view/:id" element={<JournalDisplayReview />} />
        </Routes>
      </div>
    </ListProvider>
    </AuthProvider>
  )
}

export default App
