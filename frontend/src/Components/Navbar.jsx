import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div style={{ background: "black", color: "white", padding: 20 }}>
          <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/tasks">Tasks</Link></li>
                <li><Link to="/create-task">Create Task</Link></li>
            </ul>
          </nav>
        </div>
    );
};

export default NavBar;
