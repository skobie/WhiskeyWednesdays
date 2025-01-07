import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = ({ onAuthComplete }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           
            if (isSignUp) {
                // Sign-up logic
                await axios.post(`${process.env.REACT_APP_URL}/api/auth/signup`, { email, password, isAdmin });
                alert('Sign-up Successful! Please Sign In.');
                setIsSignUp(false); // Switch to sign-in mode
            } else {
                // Sign-in logic
                const response = await axios.post(`${process.env.REACT_APP_URL}/api/auth/login`, { email, password });
                const { token, isAdmin } = response.data;

                // Store token in local storage
                localStorage.setItem('token', token);

                localStorage.setItem('isAdmin', isAdmin);

                // Pass the role back to the parent
                onAuthComplete(isAdmin ? 'admin' : 'user');

                // Redirect based on role
                if (isAdmin) {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Authentication Error:', error.response?.data || error.message);
            alert('Authentication Failed. Please check your credentials.');
            console.log(error.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
            </form>
            <p>
                {isSignUp
                    ? 'Already have an account?'
                    : "Don't have an account?"}{' '}
                <span
                    onClick={() => setIsSignUp(!isSignUp)}
                    style={{ cursor: 'pointer', color: 'blue' }}
                >
                    {isSignUp ? 'Sign in' : 'Sign Up'}
                </span>
            </p>

            {/* Forgot Password Link */}
            {!isSignUp && (
                <p>
                    <Link to="/forgot-password" style={{ color: 'blue', textDecoration: 'none' }}>
                        Forgot Password?
                    </Link>
                </p>
            )}
        </div>
    );
};

export default AuthForm;