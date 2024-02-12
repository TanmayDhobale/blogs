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
    <div>
<h2 style={{ textAlign: 'center' }}>All Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <small>Author: {blog.author}</small>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
