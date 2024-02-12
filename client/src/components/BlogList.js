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

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Theme styles dynamically adjusted
  const themes = {
    light: { backgroundColor: '#f0ead6', color: '#45322e', buttonBackground: '#f4f4f4', buttonText: '#45322e' },
    dark: { backgroundColor: '#333', color: '#f4f4f4', buttonBackground: '#444', buttonText: '#f4f4f4' },
    vintage: { backgroundColor: '#fdf6e3', color: '#586e75', buttonBackground: '#eee8d5', buttonText: '#586e75' },
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : prevTheme === 'dark' ? 'vintage' : 'light');
  };

  // Custom style functions
  const getThemeStyle = () => ({
    backgroundColor: themes[theme].backgroundColor,
    color: themes[theme].color,
    transition: 'all 0.5s ease',
  });

  const getButtonStyle = () => ({
    backgroundColor: themes[theme].buttonBackground,
    color: themes[theme].buttonText,
    border: `1px solid ${themes[theme].color}`,
    cursor: 'pointer',
    padding: '10px 15px',
    margin: '10px 0',
    borderRadius: '5px',
    transition: 'all 0.5s ease',
  });

  return (
    <div style={{ ...getThemeStyle(), padding: '20px', fontFamily: 'Georgia, serif', maxWidth: '800px', margin: '20px auto' }}>
      <h1 style={{ textAlign: 'center' }}>Blogs of Interest</h1>
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
          }}
        />
      </div>
      <button onClick={toggleTheme} style={getButtonStyle()}>
        Switch to {theme === 'light' ? 'Dark' : theme === 'dark' ? 'Vintage' : 'Light'} Mode
      </button>
      {filteredBlogs.map(blog => (
        <div key={blog._id} style={{ borderBottom: `1px solid ${themes[theme].color}`, paddingBottom: '10px', marginBottom: '20px', transition: 'all 0.5s ease' }}>
          <h2 style={{ marginTop: '0px' }}>{blog.title}</h2>
          <p>Author: {blog.author}</p>
          <button
            onClick={() => setVisibleContentId(visibleContentId === blog._id ? null : blog._id)}
            style={getButtonStyle()}
          >
            {visibleContentId === blog._id ? 'Hide' : 'Read More'}
          </button>
          {visibleContentId === blog._id && (
            <div style={{ marginTop: '10px' }}>
              <p>{blog.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
