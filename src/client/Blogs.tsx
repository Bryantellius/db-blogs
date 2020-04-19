import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IBlog } from "../utils/types";

const Blogs: React.FC<IBlogsProps> = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  const getBlogs = async () => {
    let res = await fetch(`/api/blogs`);
    let blogs = await res.json();
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
            className="border-left border-right p-3 my-3 blogs"
            key={`${blog.id}-${blog.author}-${blog.date}`}
          >
            <NavLink to={`/blog/${blog.id}`} className="nav-link text-dark">
              <h5>{blog.title}</h5>
            </NavLink>
            <h6 className="text-muted">By {blog.author}</h6>
            <hr></hr>
            <span className="date">{blog.content.slice(0, 15)}...</span>
          </div>
        );
      })}
    </>
  );
};

interface IBlogsProps {}

export default Blogs;
