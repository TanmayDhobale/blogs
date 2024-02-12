import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './components/BlogList';
import CreateBlog from './components/CreateBlog';
import Navbar from './components/hey';

function App() {
  return (
    <Router>
      <div>
         < Navbar/>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/create" element={<CreateBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
