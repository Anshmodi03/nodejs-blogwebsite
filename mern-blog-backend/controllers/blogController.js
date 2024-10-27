// controllers/blogController.js
const Blog = require("../models/Blog");

// Create a new blog post
const createBlog = async (req, res) => {
  const blog = new Blog(req.body);
  const savedBlog = await blog.save();
  if (savedBlog) return res.status(201).json(savedBlog);
  res.status(400).json({ message: "Error saving blog" });
};

// Retrieve all blog posts
const getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  if (blogs) return res.status(200).json(blogs);
  res.status(500).json({ message: "Error fetching blogs" });
};

// Edit an existing blog post
const editBlog = async (req, res) => {
  const { id } = req.params;
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
  if (updatedBlog) return res.status(200).json(updatedBlog);
  res.status(404).json({ message: "Blog not found" });
};

// Delete a blog post
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (deletedBlog) return res.status(204).send();
  res.status(404).json({ message: "Blog not found" });
};

module.exports = {
  createBlog,
  getBlogs,
  editBlog,
  deleteBlog,
};
