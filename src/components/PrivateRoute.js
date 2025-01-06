import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAdmin }) => {
    const token = localStorage.getItem('token');
    const userIsAdmin = token ? JSON.parse(atob(token.split('.')[1])).isAdmin : false;

    if (!userIsAdmin) {
        return <Navigate to="/" />; // Redirect to home if not an admin
    }

    return children;
};

export default PrivateRoute;