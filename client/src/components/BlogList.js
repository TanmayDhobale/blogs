import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Custom hook for fetching blogs
const useFetchBlogs = url => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await axios(url);
        setBlogs(result.data);
      } catch (error) {
        console.error("Could not fetch blogs", error);
      }
    };
    fetchBlogs();
  }, [url]);
  return blogs;
};

const BlogList = () => {
  const blogs = useFetchBlogs('https://blogssss-k0gl.onrender.com/blogs');
  const [visibleContentId, setVisibleContentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light'); // Options: 'light', 'dark', 'vintage'

  useEffect(() => {
    // Apply the theme to the entire page
    document.body.style.backgroundColor = themes[theme].backgroundColor;
    document.body.style.color = themes[theme].color;
    // Additional styles to ensure consistency across the page
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
  }, [theme]); // Reapply when theme changes

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const themes = {
    light: { backgroundColor: '#f0ead6', color: '#45322e', buttonBackground: '#f4f4f4', buttonText: '#45322e' },
    dark: { backgroundColor: '#333', color: '#f4f4f4', buttonBackground: '#444', buttonText: '#f4f4f4' },
    vintage: { backgroundColor: '#fdf6e3', color: '#586e75', buttonBackground: '#eee8d5', buttonText: '#586e75' },
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : prevTheme === 'dark' ? 'vintage' : 'light');
  };

  const getButtonStyle = () => ({
    backgroundColor: themes[theme].buttonBackground,
    color: themes[theme].buttonText,
    border: `1px solid ${themes[theme].color}`,
    cursor: 'pointer',
    padding: '10px 15px',
    margin: '10px 0',
    borderRadius: '5px',
    transition: 'background-color 0.5s ease, color 0.5s ease, transform 0.3s ease',
    fontFamily: '"Courier New", Courier, monospace',
    fontWeight: 'bold',
  });

  // Additional animation for hover effect on buttons
  const hoverEffect = {
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '20px auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: theme === 'vintage' ? '2px solid #eee8d5' : 'none' }}>
      <h1 style={{ textAlign: 'center', fontFamily: '"Georgia", serif', transition: 'all 0.5s ease' }}>Blogs of Interest</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by title or author..."
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            border: `1px solid ${themes[theme].color}`,
            borderRadius: '5px',
            width: 'calc(100% - 22px)',
            boxSizing: 'border-box',
            transition: 'border 0.5s ease',
          }}
        />
      </div>
      <button onClick={toggleTheme} style={{ ...getButtonStyle(), ...hoverEffect }}>
        Switch to {theme === 'light' ? 'Dark' : theme === 'dark' ? 'Vintage' : 'Light'} Mode
      </button>
      {filteredBlogs.map(blog => (
        <div key={blog._id} style={{ borderBottom: `1px solid ${themes[theme].color}`, paddingBottom: '10px', marginBottom: '20px', transition: 'all 0.5s ease' }}>
          <h2 style={{ marginTop: '0px', fontFamily: '"Georgia", serif' }}>{blog.title}</h2>
          <p style={{ fontFamily: '"Arial", sans-serif' }}>Author: {blog.author}</p>
          <button
            onClick={() => setVisibleContentId(visibleContentId === blog._id ? null : blog._id)}
            style={{ ...getButtonStyle(), ...hoverEffect }}
          >
            {visibleContentId === blog._id ? 'Hide' : 'Read More'}
          </button>
          {visibleContentId === blog._id && (
            <div style={{ marginTop: '10px', fontFamily: '"Courier New", Courier, monospace', transition: 'opacity 0.5s ease', opacity: 0.8 }}>
              <p>{blog.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
