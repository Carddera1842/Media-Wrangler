import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CenteredTabs from './components/home-page/Nav';
import Home from './components/home-page/Home';
import LogIn from './components/log-in/Login';
import Movies from './components/movies/Movies';
import Register from './components/register/Register';
import Search from './components/search/Search';

const App = () => {
    return (
        <Router>
            <CenteredTabs />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/movies" component={Movies} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/search" component={Search} />
            </Switch>
        </Router>
    )
}

export default App;