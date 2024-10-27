// App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [editMode, setEditMode] = useState({ id: null });

  const fetchBlogs = async () => {
    const { data } = await axios.get("http://localhost:8000/api/blogs/");
    setBlogs(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/api/blogs/${editMode.id || ""}`;
    await axios[editMode.id ? "put" : "post"](url, formData);
    setEditMode({ id: null });
    setFormData({ title: "", content: "" });
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setEditMode({ id: blog._id });
    setFormData({ title: blog.title, content: blog.content });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/blogs/${id}`);
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      <form onSubmit={handleSubmit} className="my-4 flex flex-col gap-2">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="border p-2"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Blog Content"
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editMode.id ? "Update Blog" : "Add Blog"}
        </button>
      </form>
      <div>
        {blogs.map(({ _id, title, content, createdAt }) => (
          <div
            key={_id}
            className="border p-2 my-2 flex justify-between items-start"
          >
            <div>
              <h2 className="font-bold">{title}</h2>
              <p>{content}</p>
              <p className="text-gray-500 text-sm">
                {new Date(createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit({ _id, title, content })}
                style={{ color: "blue", backgroundColor: "white" }}
              >
                EDIT
              </button>
              <button
                onClick={() => handleDelete(_id)}
                style={{ color: "red", backgroundColor: "white" }}
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
