import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { debounce } from 'lodash';

// Dark and light theme definitions
const themes = {
  dark: {
    background: '#2D2D2D',
    color: '#FFFFFF',
    cardBackground: '#3C3C3C',
    highlight: '#F4D03F',
    toggleBorder: '#6B8096',
  },
  light: {
    background: '#FFFFFF',
    color: '#363537',
    cardBackground: '#F0F0F0',
    highlight: '#3498DB',
    toggleBorder: '#FFF',
  },
};

// Global style for smooth theme transitions
const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    transition: all 0.3s linear;
  }
`;

// Styled-components
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.highlight};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;

const BlogCard = styled.div`
  background: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.color};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  color: ${(props) => props.theme.highlight};
`;

const Author = styled.small`
  display: block;
  margin-bottom: 15px;
`;

const Content = styled.p`
  max-height: ${(props) => (props.isVisible ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
`;

const ToggleButton = styled.button`
  background-color: ${(props) => props.theme.highlight};
  color: ${(props) => props.theme.background};
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const ThemeSwitcher = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 24px;
  color: ${(props) => props.theme.highlight};
`;

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [theme, setTheme] = useState('light');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchBlogs() {
      const result = await axios('https://blogssss-k0gl.onrender.com/blogs');
      setBlogs(result.data.map(blog => ({ ...blog, isVisible: false })));
    }
    fetchBlogs();
  }, []);

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  const handleSearch = debounce((e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }, 300);

  const toggleContentVisibility = (id) => {
    setBlogs(blogs.map(blog => blog._id === id ? { ...blog, isVisible: !blog.isVisible } : blog));
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.content.toLowerCase().includes(searchTerm)
  );

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyles />
      <Container>
        <SearchBar
          onChange={handleSearch}
          placeholder="Search blogs..."
        />
        <ThemeSwitcher onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </ThemeSwitcher>
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id}>
            <Title>{blog.title}</Title>
            <Author>Author: {blog.author}</Author>
            {blog.isVisible && <Content>{blog.content}</Content>}
            <ToggleButton onClick={() => toggleContentVisibility(blog._id)}>
              {blog.isVisible ? 'Hide' : 'Read More'}
            </ToggleButton>
          </BlogCard>
        ))}
      </Container>
    </ThemeProvider>
  );
}

export default BlogList;
