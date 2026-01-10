import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ background: "black", color: "white", padding: 20 }}>
          <nav>
            <ul>
                {isLoggedIn && <li><Link to="/">Home</Link></li>}
                {isLoggedIn && <li><Link to="/tasks">Tasks</Link></li>}
                {isLoggedIn && <li><Link to="/create-task">Create Task</Link></li>}
                {isLoggedIn && <li><Link to="/update-user/1">Update User</Link></li>}
                {isLoggedIn && <li><Link to="/delete-user/1">Delete User</Link></li>}
                {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
                {isLoggedIn && <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button></li>}
            </ul>
          </nav>
        </div>
    );
};

export default NavBar;
