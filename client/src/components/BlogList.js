import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled-components for enhanced CSS in JS
const Container = styled.div`
  font-family: 'Times New Roman', Times, serif;
  color: #3a3a3a;
  background-color: #f9f8f6;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  margin: 20px auto;
  width: 80%;
  border: 1px solid #a8a8a8;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h2`
  text-align: center;
  font-weight: normal;
  color: #5e5a5a;
  border-bottom: 2px solid #a8a8a8;
  padding-bottom: 10px;
`;

const BlogItem = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 5px solid #9e9a91;
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogTitle = styled.h3`
  font-size: 22px;
  color: #4d4a4a;
`;

const BlogContent = styled.p`
  font-size: 16px;
  color: #606060;
  text-indent: 2em;
  line-height: 1.6;
`;

const ReadMoreButton = styled.button`
  display: inline-block;
  margin-top: 10px;
  padding: 5px 15px;
  background-color: #7a746e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Garamond', serif;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #605f5d;
  }
`;

const Author = styled.small`
  display: block;
  margin-top: 10px;
  font-style: italic;
  font-size: 14px;
`;

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const result = await axios('https://blogssss-k0gl.onrender.com/blogs');
        setBlogs(result.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    fetchBlogs();
  }, []);

  const [visibleBlogId, setVisibleBlogId] = useState(null);

  const toggleContentVisibility = (id) => {
    setVisibleBlogId(visibleBlogId === id ? null : id);
  };

  return (
    <Container>
      <Title>Academic Chronicles</Title>
      {blogs.map((blog) => (
        <BlogItem key={blog._id}>
          <BlogTitle>{blog.title}</BlogTitle>
          {visibleBlogId === blog._id && <BlogContent>{blog.content}</BlogContent>}
          <ReadMoreButton onClick={() => toggleContentVisibility(blog._id)}>
            {visibleBlogId === blog._id ? 'Less' : 'Read More'}
          </ReadMoreButton>
          <Author>Author: {blog.author}</Author>
        </BlogItem>
      ))}
    </Container>
  );
}

export default BlogList;
