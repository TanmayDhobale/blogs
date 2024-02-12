const mongoose = require('mongoose');
const blogsRoutes = require('./routes/Blogs');
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
