import React from 'react';
import './AdminStatusTag.css';

const AdminStatusTag = () => {
    const token = localStorage.getItem('token');
    const isAdmin = token ? JSON.parse(atob(token.split('.')[1])).isAdmin : false;

    return (
        <div className="admin-status-tag">
            {isAdmin ? (
                <span className="admin-tag">Admin</span>
            ) : (
                <span className="user-tag">User</span>
            )}
        </div>
    );
};

export default AdminStatusTag;