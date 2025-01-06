import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AuthForm.css';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();
    const hasCheckedRef = useRef(false);  // Ref to store the check status

    useEffect(() => {
        // Only check the token if it hasn't been checked already
        if (!hasCheckedRef.current) {
            const checkToken = async () => {
                try {
                    // Try verifying the token by sending a request
                    await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { newPassword: '' });
                    hasCheckedRef.current = true;  // Mark the token check as done
                } catch (err) {
                    // If token is expired or invalid, show the alert and redirect
                    if (err.response && err.response.data.message === 'Token has expired') {
                        setError('Your reset link has expired.');
                        setMessage('');
                        if (!hasCheckedRef.current) {  // Check if alert has already been shown
                            alert('Your reset link has expired. Please request a new one.');
                            navigate('/');  // Redirect to home or another page
                            hasCheckedRef.current = true;  // Prevent multiple alerts
                        }
                    } else {
                        setError('An error occurred. Please try again.');
                    }
                }
            };

            checkToken();
        }
        // Dependency array is empty to ensure effect runs only once
    }, [token, navigate]);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { newPassword });
            setMessage(response.data.message);
            setError(''); // Clear any previous errors
            alert('Password succesfully changed!');
            navigate('/auth');
        } catch (err) {
            // Log the error details to debug
            console.error('Error details:', err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data.message : 'Failed to reset password. Please try again.');
            setMessage(''); // Clear any previous success message
        }
    };

    return (
        <div className="auth-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>

            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
    
};

export default ResetPassword;