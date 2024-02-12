import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await axios('http://localhost:5000/blogs');
      setBlogs(result.data);
    };
    fetchBlogs();
  }, []);

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
      }}>All Blogs</h2>
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
          <p style={{
            fontSize: '16px',
            color: '#666666'
          }}>{blog.content}</p>
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
