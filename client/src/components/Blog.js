import React from 'react';

function Blog({ blog }) {
  return (
    <div>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      <p><b>Author:</b> {blog.author}</p>
    </div>
  );
}

export default Blog;
