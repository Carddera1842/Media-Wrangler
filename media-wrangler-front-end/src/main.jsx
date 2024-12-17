import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Nav from './components/home-page/Nav'; // Import Nav component
import Login from './components/log-in/Login'; // Import Login component
import 'bootstrap/dist/css/bootstrap.min.css'; // If you are using Bootstrap
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router for routing

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Nav />
      <Login />
    </div>
  );
}

// Rendering the App inside Router for routing purposes
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Wrap your app in Router */}
      <App />
    </Router>
  </React.StrictMode>
);
