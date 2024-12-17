import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Nav from './components/home-page/nav';
import Home from './components/home-page/Home';
import LogIn from './components/log-in/Login';
import Movies from './components/movies/Movies';
import Register from './components/register/Register';
import Search from './components/search/Search';

const App = () => {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </Router>
    )
}

export default App;