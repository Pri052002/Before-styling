import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    // State for form inputs
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student');

    // State for feedback messages
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous messages
        setFeedbackMessage('');
        setErrorMessage('');

        try {
            // Make API request to register a new user
            await axios.post('http://localhost:5033/api/User/register', {
                username,
                email,
                password,
                role,
            });

            // Success message and form reset
            setFeedbackMessage('Registration successful! Waiting for approval.');
            setUsername('');  // Clear form fields
            setEmail('');
            setPassword('');
            setRole('Student');
        } catch (error) {
            // Handle error responses from the API
            const errorMsg = error.response?.data || 'Registration failed. Please try again.';
            setErrorMessage(errorMsg);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                
                {feedbackMessage && <p style={{ color: 'green' }}>{feedbackMessage}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Student">Student</option>
                    <option value="Professor">Professor</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
