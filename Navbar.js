// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const role = localStorage.getItem('role');

    return (
        <nav>
            <Link to="/">Home</Link>
            {role === 'Student' && <Link to="/student-dashboard">Dashboard</Link>}
            {role === 'Professor' && <Link to="/professor-dashboard">Dashboard</Link>}
            {role === 'Registrar' && <Link to="/registrar-dashboard">Dashboard</Link>}
            <Link to="/login">Login</Link>
        </nav>
    );
};

export default Navbar;