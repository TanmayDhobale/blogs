const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Adjust the path as necessary



// Get a single blog post
router.get('/:id', getBlog, (req, res) => {
    res.json(res.blog);
});

// Create a new blog post
router.post('/', async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
    });
    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a blog post
router.patch('/:id', getBlog, async (req, res) => {
    if (req.body.title != null) {
        res.blog.title = req.body.title;
    }
    if (req.body.content != null) {
        res.blog.content = req.body.content;
    }
    if (req.body.author != null) {
        res.blog.author = req.body.author;
    }
    try {
        const updatedBlog = await res.blog.save();
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a blog post
router.delete('/:id', getBlog, async (req, res) => {
    try {
        await res.blog.remove();
        res.json({ message: 'Deleted blog post' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a blog post by ID
async function getBlog(req, res, next) {
    let blog;
    try {
        blog = await Blog.findById(req.params.id);
        if (blog == null) {
            return res.status(404).json({ message: 'Cannot find blog' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.blog = blog;
    next();
}

module.exports = router;
