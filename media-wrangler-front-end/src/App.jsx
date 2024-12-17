import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Nav from './components/home-page/nav';
import Home from './components/home-page/Home';
import Login from './components/log-in/Login';
import loginSuccess from './components/log-in/LoginSuccess';
import Movies from './components/movies/Movies';
import Register from './components/register/Register';
import Search from './components/search/Search';

const App = () => {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/loginsuccess" element={<loginSuccess />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </Router>
    )
}

export default App;