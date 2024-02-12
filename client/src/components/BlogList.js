import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [visibleContentId, setVisibleContentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function fetchBlogs() {
      const result = await axios('https://blogssss-k0gl.onrender.com/blogs');
      setBlogs(result.data);
    }
    fetchBlogs();
  }, []);

  const toggleContentVisibility = (id) => {
    setVisibleContentId(visibleContentId === id ? null : id);
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Define styles for light and dark themes
  const themeStyles = {
    light: {
      backgroundColor: '#f4f4f4',
      color: '#3e4e59',
    },
    dark: {
      backgroundColor: '#333333',
      color: '#f4f4f4',
    },
  };

  const buttonStyle = {
    display: 'block',
    margin: '10px 0',
    padding: '5px 10px',
    backgroundColor: darkMode ? '#586E75' : '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={{
      ...themeStyles[darkMode ? 'dark' : 'light'],
      fontFamily: "'Georgia', serif",
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      margin: '20px auto',
      width: '80%'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          style={{
            padding: '10px',
            fontSize: '16px',
            margin: '10px 0',
            borderRadius: '5px',
            border: `1px solid ${darkMode ? '#f4f4f4' : '#333333'}`,
            backgroundColor: darkMode ? '#333333' : '',
            color: darkMode ? '#f4f4f4' : '#333333',
          }}
          type="text"
          placeholder="Search blogs..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={toggleTheme} style={buttonStyle}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>All Blogs</h2>
      {filteredBlogs.map((blog) => (
        <div key={blog._id} style={{
          backgroundColor: darkMode ? '#586E75' : '#ffffff',
          padding: '15px',
          marginBottom: '15px',
          borderLeft: `5px solid ${darkMode ? '#789' : '#8c8c8c'}`,
          borderRadius: '5px',
          color: darkMode ? '#f4f4f4' : '#333333',
        }}>
          <h3>{blog.title}</h3>
          <small>Author: {blog.author}</small>
          <button
            style={buttonStyle}
            onClick={() => toggleContentVisibility(blog._id)}
          >
            {visibleContentId === blog._id ? 'Hide' : 'Read More'}
          </button>
          {visibleContentId === blog._id && (
            <p>{blog.content}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default BlogList;
