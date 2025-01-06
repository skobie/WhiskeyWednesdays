import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthForm.css'; // Reusing the same CSS file

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send the email to the forgot password endpoint
            const response = await axios.post('/api/auth/forgot-password', { email });
            setMessage(response.data.message); // Display success message
            setError(''); // Clear any existing errors
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
            setMessage(''); // Clear any existing success message
        }
    };

    return (
        <div className="auth-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p className="success-message">{message}</p>} {/* Success message */}
            {error && <p className="error-message">{error}</p>} {/* Error message */}
            <p>
                Remembered your password?{' '}
                <span
                    onClick={() => navigate('/auth')}
                    style={{ cursor: 'pointer', color: 'blue' }}
                >
                    Sign In
                </span>
            </p>
        </div>
    );
};

export default ForgotPassword;