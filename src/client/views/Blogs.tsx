import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IBlog } from "../utils/types";
import { apiService } from "../utils/apiService";

// Function Component that fetches and renders list of blogs
const Blogs: React.FC<IBlogsProps> = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  const getBlogs = async () => {
    let blogs = await apiService(`/api/blogs`);
    setBlogs(blogs);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      {blogs.map((blog) => {
        return (
          <div
            className="border-left border-right p-3 my-3 w-75 mx-auto blogs"
            key={`${blog.id}-${blog.author}-${blog.date}`}
          >
            <NavLink to={`/blog/${blog.id}`} className="nav-link pl-0 text-dark">
              <h3>{blog.title}</h3>
            </NavLink>
            <h6 className="text-muted">By {blog.author}</h6>
            <hr></hr>
            <span className="date">{blog.content.slice(0, 100)}...</span>
          </div>
        );
      })}
    </>
  );
};

interface IBlogsProps {}

export default Blogs;
