import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    background: '#f4f4f4',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    fontFamily: '"Georgia", serif',
  };

  const ulStyle = {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-around',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#5D5C61',
    backgroundColor: '#7395AE',
    padding: '10px 20px',
    borderRadius: '4px',
    fontFamily: '"Georgia", serif',
    fontSize: '18px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    transition: 'background-color 0.3s',
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li>
          <Link to="/" style={linkStyle} onMouseOver={e => e.target.style.backgroundColor = '#B1A296'} onMouseOut={e => e.target.style.backgroundColor = '#7395AE'}>Home</Link>
        </li>
        <li>
          <Link to="/create" style={linkStyle} onMouseOver={e => e.target.style.backgroundColor = '#B1A296'} onMouseOut={e => e.target.style.backgroundColor = '#7395AE'}>Create Blog</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
