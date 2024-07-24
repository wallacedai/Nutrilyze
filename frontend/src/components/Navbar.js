// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ background: '#333', color: '#fff', padding: '10px 20px' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around', margin: 0, padding: 0 }}>
        <li><Link to="/scanner" style={{ color: 'white', textDecoration: 'none' }}>Scanner</Link></li>
        <li><Link to="/history" style={{ color: 'white', textDecoration: 'none' }}>History</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
