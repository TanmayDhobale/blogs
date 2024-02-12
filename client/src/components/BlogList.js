import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await axios('https://blogssss-k0gl.onrender.com/blogs');
      setBlogs(result.data);
    };
    fetchBlogs();
  }, []);

  // State to track the visibility of blog content
  const [visibleBlogId, setVisibleBlogId] = useState(null);

  const toggleContentVisibility = (id) => {
    // Toggle visibility: if the clicked blog is already visible, hide it, otherwise show it
    setVisibleBlogId(visibleBlogId === id ? null : id);
  };

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      color: '#3e4e59',
      backgroundColor: '#f4f4f4',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      margin: '20px auto',
      width: '80%'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        fontWeight: 'bold', 
        color: '#2a2a2a' 
      }}>All Blog`s</h2>
      {blogs.map((blog) => (
        <div key={blog._id} style={{
          backgroundColor: '#ffffff',
          padding: '15px',
          marginBottom: '15px',
          borderLeft: '5px solid #8c8c8c',
          borderRadius: '5px'
        }}>
          <h3 style={{
            fontSize: '24px',
            color: '#333333'
          }}>{blog.title}</h3>
          {/* Conditionally render the blog content if its ID matches the visibleBlogId */}
          {visibleBlogId === blog._id && (
            <p style={{
              fontSize: '16px',
              color: '#666666'
            }}>{blog.content}</p>
          )}
          <button 
            style={{
              display: 'block',
              margin: '10px 0',
              padding: '5px 10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            onClick={() => toggleContentVisibility(blog._id)}
          >
            {visibleBlogId === blog._id ? 'Hide' : 'Read More'}
          </button>
          <small style={{
            fontStyle: 'italic',
            fontSize: '14px'
          }}>Author: {blog.author}</small>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
