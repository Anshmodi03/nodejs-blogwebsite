// routes/blogRoutes.js
const express = require("express");
const {
  createBlog,
  getBlogs,
  editBlog,
  deleteBlog,
} = require("../controllers/blogController");
const router = express.Router();

router.post("/blogs", createBlog);
router.get("/blogs", getBlogs);
router.put("/blogs/:id", editBlog);
router.delete("/blogs/:id", deleteBlog);

module.exports = router;
