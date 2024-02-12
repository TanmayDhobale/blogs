import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    author: ''
  });

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/blogs', blog);
      setBlog({ title: '', content: '', author: '' }); // Reset form after submission
    } catch (error) {
      console.error(error);
    }
  };

  // Define styles here
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    background: '#f7f7f7',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: '"Courier New", Courier, monospace',
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    background: '#fafafa',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: '#6a994e',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '18px',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        name="title"
        value={blog.title}
        onChange={handleChange}
        placeholder="Title"
        style={inputStyle}
      />
      <textarea
        name="content"
        value={blog.content}
        onChange={handleChange}
        placeholder="Content"
        style={{ ...inputStyle, height: '150px', resize: 'vertical' }}
      ></textarea>
      <input
        type="text"
        name="author"
        value={blog.author}
        onChange={handleChange}
        placeholder="Author"
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Post Blog</button>
    </form>
  );
};

export default CreateBlog;
