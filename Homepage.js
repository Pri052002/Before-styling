import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1>Welcome to Kinston University</h1>
        <p>Manage your academic journey easily with our platform.</p>
        <div className="buttons">
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-register">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
