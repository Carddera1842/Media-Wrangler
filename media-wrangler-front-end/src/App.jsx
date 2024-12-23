import React from 'react';
import MovieSearch from './components/MovieSearch';
//import 'App.css';  // Importing global styles

function App() {
    return (
        <div className="App">
            <h1>Welcome to Media Wrangler</h1>
            <MovieSearch />  {/* Use the MovieSearch component */}
        </div>
    );
}

export default App;

